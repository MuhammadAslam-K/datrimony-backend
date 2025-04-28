
import { body, query } from 'express-validator';

export const validateSignup = [
  body('name')
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone('any').withMessage('Must be a valid phone number'),
];

export const validateLogin = [
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone('any').withMessage('Must be a valid phone number'),
];


export const validatePhoneOtp = [
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone('any').withMessage('Must be a valid phone number'),

  query('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['login', 'signup']).withMessage('Type must be either login or signup'),

  body('name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
];


export const validatePhoneOtpValidation = [
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone('any').withMessage('Must be a valid phone number'),
  body('otp')
    .notEmpty().withMessage('Otp is required')
    .isMobilePhone('any').withMessage('Must be a valid OTP'),
];
