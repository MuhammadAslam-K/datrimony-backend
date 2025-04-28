import { Request, Response } from 'express';


export interface IAuthController {
    signup(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;

    sendOtpPhone(req: Request, res: Response): Promise<void>;
    validateOtpPhone(req: Request, res: Response): Promise<void>;
}