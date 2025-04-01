import Joi from 'joi';
import { GENDER, GLOBAL } from '../../constants/key.constant';

export const registerUserSchema = Joi.object().keys({
	name: Joi.string().required().messages({
		'string.base': 'Name must be a string',
		'any.required': 'Name is required',
	}),
	gender: Joi.string()
		.valid(...Object.values(GENDER))
		.required()
		.messages({
			'string.base': 'Gender must be a string',
			'any.only': 'Gender must be one of the allowed values. (Male, Female)',
			'any.required': 'Gender is required',
		}),
	dob: Joi.date().required().messages({
		'date.base': 'Date of birth must be a valid date',
		'any.required': 'Date of birth is required',
	}),
	address: Joi.string().trim().required().messages({
		'string.base': 'Address must be a string',
		'any.required': 'Address is required',
	}),
	profileImage: Joi.string().trim().allow('', null).optional(),
	phone: Joi.number().required().messages({
		'number.base': 'Phone must be a number',
		'any.required': 'Phone number is required',
	}),
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
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': GLOBAL.CONFIRM_PASSWORD_NOT_SAME,
		'any.required': 'Confirm password is required',
	}),
});
