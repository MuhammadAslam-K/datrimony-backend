import expressRateLimit from 'express-rate-limit'

export const rateLimit = expressRateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});