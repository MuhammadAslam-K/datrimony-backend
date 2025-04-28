import { Response } from 'express'

class CustomError extends Error {
    type: string;
    statusCode: number;

    constructor(message: string, type: string, statusCode: number) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
        this.name = type; // Optional: makes debugging easier
    }
}

export const throwError = (message: string, type: string, statusCode: number) => {
    throw new CustomError(message, type, statusCode);
};

export const sendResponse = (res: Response, data: any, additional_data = {}) => {
    return res.status(200).json({
        success: true,
        data: data,
        ...additional_data
    });
};