import { Request, Response } from "express";
import { IAuthService } from "@services/interface/IAuthService";
import { IAuthController } from './../interface/IAuthController';
import { sendResponse } from "@/utils/response";

export class AuthController implements IAuthController {
    constructor(private _authService: IAuthService) { }


    async signup(req: Request, res: Response): Promise<void> {
        const { name, email, phone } = req.body;
        const response = await this._authService.signup({ name, email, phone });
        sendResponse(res, response);
    }

    async login(req: Request, res: Response): Promise<void> {
        const { phone } = req.body;
        const response = await this._authService.login({ phone });
        sendResponse(res, response);
    }

    async sendOtpPhone(req: Request, res: Response): Promise<void> {
        const { phone, name } = req.body;
        const { type } = req.query;
        const response = await this._authService.sendOtpPhone({ phone, name, type: type as string });
        sendResponse(res, response);
    }

    async validateOtpPhone(req: Request, res: Response): Promise<void> {
        const { phone, otp } = req.body;
        const response = await this._authService.validateOtpPhone({ phone, otp });
        sendResponse(res, response);
    }

}