
import { Server } from 'socket.io';
import http from 'http';
import { logger } from '../../utils/logger';

// Online users for typing indicator (in-memory for PoC, use Redis for production)
let onlineUsers: Record<string, string> = {};

/**
 * Sets up a Socket.io server for real-time chat
 * @param port The port to run the socket server on
 */
export const setupSocketServer = (port: number): void => {
  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ["GET", "POST"],
      credentials: true
    },
    // Add production-optimized settings
    pingTimeout: 60000,
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Join a room: { room: "user1_user2", user: "alice" }
    socket.on('join_room', ({ room, user }) => {
      socket.join(room);
      socket.data.username = user;
      onlineUsers[user] = socket.id;
      logger.info(`${user} joined ${room}`);
      // Notify others in room (except joining user)
      socket.to(room).emit('user_joined', user);
      // For support, join 'support' room too
      if (room === "support") {
        socket.join("support");
      }
    });

    // Broadcast message to room
    // { room, user, text, time }
    socket.on('send_message', (data) => {
      // Echo to room including sender
      io.to(data.room).emit('receive_message', {
        ...data,
        delivered: true,
      });
    });

    // Typing indicator: { room, user, typing: true/false }
    socket.on('typing', ({ room, user, typing }) => {
      socket.to(room).emit('typing', { user, typing });
    });

    // Handle reconnection attempts
    socket.on('reconnect_attempt', () => {
      logger.info(`Reconnection attempt by socket: ${socket.id}`);
    });

    // On disconnect
    socket.on('disconnect', () => {
      const user = socket.data.username || "unknown";
      logger.info(`Socket disconnected: ${socket.id} (${user})`);
      delete onlineUsers[user];
      // Broadcast user offline status if needed
    });
  });

  // Start the server
  httpServer.listen(port, () => {
    logger.info(`Chat server running on port ${port}`);
  });

  // Health check endpoint (handled by the HTTP server)
  httpServer.on('request', (req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', service: 'chat-server' }));
    } else {
      res.writeHead(200);
      res.end('Datrimony Chat Server Running');
    }
  });
};
