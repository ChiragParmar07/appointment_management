import Joi from 'joi';
import { GLOBAL } from '../constants/key.constant';

export const userLoginSchema = Joi.object().keys({
	email: Joi.string().email().required().messages({
		'string.email': 'Email must be a valid email address',
		'any.required': 'Email is required',
	}),
	password: Joi.string()
		.pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
		)
		.required()
		.messages({
			'string.pattern.base': GLOBAL.PASSWORD_NOT_MATCH,
			'string.base': 'Password must be a string',
			'any.required': 'Password is required',
		}),
});

export const resendEmailVerificationTokenSchema = Joi.object().keys({
	email: Joi.string().email().required().messages({
		'string.email': 'Email must be a valid email address',
		'any.required': 'Email is required',
	}),
});

export const verifyUserEmailSchema = Joi.object().keys({
	token: Joi.string().required().messages({
		'string.base': 'Token must be a string',
		'any.required': 'Token is required',
	}),
});

export const userForgotPasswordSchema = Joi.object().keys({
	email: Joi.string().email().required().messages({
		'string.email': 'Email must be a valid email address',
		'any.required': 'Email is required',
	}),
});
