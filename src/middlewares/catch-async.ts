import { Request, Response, NextFunction } from 'express';


interface ErrorWithDetails extends Error {
    type?: string;
    errno?: number;
}

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync = (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise
        .resolve(fn(req, res, next))
        .catch(async (err: ErrorWithDetails) => {
            console.error(err);
            console.log('===== **** ERROR FROM CATCH ASYNC **** =====', err?.message);
            if (err.type) {
                return res.status(err.errno || 400).json({
                    success: false,
                    message: err.message,
                    type: err.type,
                    errno: err.errno
                });
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                    err,
                    errMessage: err.message || 'No error message',
                    type: "INTERNAL_ERROR",
                    errno: 500
                });
            }
        });
};