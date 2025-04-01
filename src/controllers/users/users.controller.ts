import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { ValidationError } from 'class-validator';
import { ERROR, REGISTER } from '../../constants/key.constant';
import { registerUserSchema } from '../../middlewares/users/users.middleware';
import {
	findExistingUser,
	createUsers,
} from '../../services/users/users.service';
import { generateLoginToken } from '../../utils/jwt/jwt.util';

export const registerUsers = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const body = await registerUserSchema.validateAsync(request.body);

		const existingUser = await findExistingUser(body.email);

		if (existingUser) {
			return response.status(StatusCodes.BAD_REQUEST).json({
				data: {},
				status: 'failed',
				message: REGISTER.USER_EXIST,
			});
		}

		const user = await createUsers({
			name: body.name,
			gender: body.gender,
			dob: body.dob,
			address: body.address,
			profileImage: body.profileImage,
			phone: body.phone,
			email: body.email,
			password: body.password,
		});

		const token = await generateLoginToken({
			id: user._id.toString(),
			email: user.email,
		});

		return response.status(StatusCodes.CREATED).json({
			data: { token },
			status: 'success',
			message: REGISTER.SUCCESS,
		});
	} catch (error: any) {
		console.log('========== Error while registering user ==========\n', error);

		if (error.toString().includes('ValidationError')) {
			return response.status(StatusCodes.BAD_REQUEST).json({
				data: {},
				status: 'failed',
				message: error['details']
					.map((detail: any) => detail.message)
					.join(', '),
			});
		}

		// if (error instanceof ValidationError) {
		// 	return response.status(StatusCodes.BAD_REQUEST).json({
		// 		data: {},
		// 		status: 'failed',
		// 		message: error['details'].map((detail) => detail.message).join(', '),
		// 	});
		// }

		return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			data: {},
			status: 'failed',
			message: ERROR.INTERNAL_SERVER_ERROR,
		});
	}
};
