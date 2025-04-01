// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_CONNECTION } from '../constants/key.constant';
// dotenv.config();

import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

export const serverConfig = {
	port: process.env.PORT || 8000,
	developerName: process.env.DEVELOPER_NAME || 'unknown',
	environment: process.env.NODE_ENV || 'development',
	mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/',
	database: process.env.MONGODB_DATABASE_NAME || 'appointment_management',
	clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
	serverUrl: process.env.SERVER_URL || 'http://localhost:5050',
	passwordEncryptLevel: Number(process.env.PASSWORD_ENCRYPT_LEVEL) || 12,
	jwt_secret:
		(process.env.JWT_SECRET?.toString() as string) || 'ThisIsSecretKey',
	jwt_expire: (process.env.JWT_EXPIRES_IN?.toString() as string) || '1d',
	createhash_key: process.env.CREATEHASH_KEY,
	forgotPasswordJwtSecret:
		process.env.FORGOT_PASSWORD_JWT_SECRET || 'ThisIsSecretKey',
	forgotPasswordJwtExpire: process.env.FORGOT_PASSWORD_JWT_EXPIRES_IN || '1h',
};

export const findEnvironment = () => {
	return serverConfig.environment;
};

export const connectMongoDb = async () => {
	try {
		const dbURL = serverConfig.mongoURI + serverConfig.database;

		await mongoose.connect(dbURL);

		console.log(`========== ${DB_CONNECTION.SUCCESS} ==========`);
	} catch (error) {
		console.error(`========== ${DB_CONNECTION.FAIL} ==========: `, error);
	}
};
