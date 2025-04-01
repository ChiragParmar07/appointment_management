import { UserModel } from '../../models/users/users.model';

export const findExistingUser = async (email: string) => {
	const user = await UserModel.findOne({ email });

	return user;
};

export const createUsers = async (payload: any) => {
	console.log(payload);
	const user = await UserModel.create(payload);

	return user;
};
