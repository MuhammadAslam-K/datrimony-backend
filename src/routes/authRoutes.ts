
import { Router } from 'express';
import { AuthController } from '@controllers/implementation/auth.controller';
import { AuthService } from '@services/implementation/auth.service';
import { AuthRepository } from '@/repository/implmentation/auth.repo';
import { rateLimit } from '@/middlewares/rateLimit';
import { catchAsync } from '@middlewares/catch-async';
import { validateLogin, validatePhoneOtp, validatePhoneOtpValidation, validateSignup } from '@/validators/authValidators';
import { handleValidationErrors } from '@/middlewares/validate-request';

const router = Router();
const authController = new AuthController(new AuthService(new AuthRepository()));

router.use(rateLimit); // Apply rate limiting to all routes in this router

router.post('/signup', validateSignup, handleValidationErrors, catchAsync(authController.signup.bind(authController)));
router.post('/login', validateLogin, handleValidationErrors, catchAsync(authController.login.bind(authController)));

router.post('/send-otp/phone', validatePhoneOtp, handleValidationErrors, catchAsync(authController.sendOtpPhone.bind(authController)));
router.post('/validate-otp/phone', validatePhoneOtpValidation, handleValidationErrors, catchAsync(authController.validateOtpPhone.bind(authController)));

export default router;