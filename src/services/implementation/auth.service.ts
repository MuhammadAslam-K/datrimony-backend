import { IAuthRepository } from "@/repository/interface/IAuthRepo";
import { IAuthService } from "../interface/IAuthService";
import { throwError } from "@/utils/response";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt-token";
import otpGenerator from "otp-generator";
import { redisDelete, redisGet, redisSet } from "@/utils/redis";
import { sendSMSOtp } from "@/utils/sent-otp-phone";

export class AuthService implements IAuthService {
    constructor(private _userRepository: IAuthRepository) { }

    async signup({ name, email, phone }: { name: string; email: string; phone: string }): Promise<{ message: string; accessToken: string; }> {

        const isEmailExists = await this._userRepository.findOne({ email });
        if (isEmailExists) throw throwError("Email already exists. Please Login", "CONFLICT", 409);

        const isPhoneExists = await this._userRepository.findOne({ phone });
        if (isPhoneExists) throw throwError("Phone already exists. Please Login", "CONFLICT", 409);


        const newUser = await this._userRepository.create({ name, email, phone });
        const payload = {
            id: (newUser._id as string).toString(),
            email: newUser.email,
            name: newUser.name,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        await this._userRepository.findByIdAndUpdate((newUser._id as string).toString(), { refreshToken });


        return {
            message: "User signed up successfully!",
            accessToken,
        };
    }

    async login({ phone }: { phone: string }): Promise<{ message: string; accessToken: string; }> {
        const isUserExists = await this._userRepository.findOne({ phone });
        if (!isUserExists) throw throwError("User not found", "NOT_FOUND", 404);

        const payload = {
            id: isUserExists._id,
            email: isUserExists.email,
            name: isUserExists.name,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await this._userRepository.findByIdAndUpdate((isUserExists._id as string).toString(), { refreshToken });

        return {
            message: "User login up successfully!",
            accessToken,
        };
    }


    async sendOtpPhone({ phone, type, name }: { phone: string; name: string; type: string }): Promise<string> {
        const isPhoneExists = await this._userRepository.findOne({ phone });
        if (type === 'signup') {
            if (isPhoneExists) throw throwError("Phone already exists. Please Login", "CONFLICT", 409);
        } else if (type === 'login') {
            if (!isPhoneExists) throw throwError("Phone number not found", "NOT_FOUND", 404);
        }

        if (process.env.NODE_ENV === 'development') {
            return 'send otp to phone number';
        }
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        await redisSet(phone, otp, 50);
        await sendSMSOtp({ phone, otp, username: name || 'User' })
        return 'send otp to phone number';
    }

    async validateOtpPhone({ phone, otp }: { phone: string; otp: string }): Promise<string> {
        if (process.env.NODE_ENV === 'development') {
            return 'Otp validated successfully';
        }
        const isOtpExists = await redisGet(phone)
        if (!isOtpExists) throw throwError("OTP not found", "NOT_FOUND", 404);
        if (isOtpExists != otp) throw throwError("Invalid OTP", "NOT_FOUND", 404);
        await redisDelete(phone);

        return 'Otp validated successfully';
    }
}