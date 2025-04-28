

export interface IAuthService {

    signup({ name, email, phone }: { name: string; email: string; phone: string }): Promise<{ message: string; accessToken: string; }>;
    login({ phone }: { phone: string }): Promise<{ message: string; accessToken: string; }>;
    sendOtpPhone({ phone, type, name }: { phone: string, name: string; type: string }): Promise<string>;
    validateOtpPhone({ phone, otp }: { phone: string, otp: string }): Promise<string>;
}