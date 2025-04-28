import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array({ onlyFirstError: true }).map(err => ({
            message: err.msg,
        }));

        return res.status(422).json({
            success: false,
            error: formattedErrors[0].message,
        });
    }

    next();
};
