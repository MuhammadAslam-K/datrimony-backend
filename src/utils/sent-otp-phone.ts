const unirest = require('unirest');

interface SendSMSOtpParams {
    phone: string;
    otp: string;
    username: string;
}

export const sendSMSOtp = async ({ phone, otp, username }: SendSMSOtpParams) => {
    const formattedPhone = phone.startsWith('+91') ? phone.slice(3) : phone;

    return new Promise((resolve, reject) => {
        const req = unirest("POST", 'https://www.fast2sms.com/dev/bulkV2');
        req.headers({
            "authorization": process.env.FAST2SMS_API,
        });

        req.form({
            "sender_id": process.env.DLT_HEADER,
            "message": process.env.DLT_MESSAGE_ID,
            "variables_values": `${username}|${otp}`,
            "route": "dlt",
            "numbers": formattedPhone,
        });

        req.end(function (res: { error: any; body: unknown; }) {
            if (res.error) {
                // Reject with the error
                reject(res.error);
            } else {
                // Resolve with the response body
                resolve(res.body);
            }
        });
    });
};