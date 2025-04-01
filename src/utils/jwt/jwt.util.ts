import * as jwt from 'jsonwebtoken';
import {
	EmailVerificationToken,
	ForgotPasswordToken,
	TokenData,
} from '../../constants/key.constant';
import { serverConfig } from '../../configs/config';

/**
 * Generates a JWT token for user login.
 *
 * @param payload - The payload containing user information to be included in the token.
 * @returns A Promise that resolves to the generated JWT token as a string.
 *          If an error occurs during token generation, the Promise will be rejected with an error message.
 */
export const generateLoginToken = async (
	payload: TokenData
): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			serverConfig.jwt_secret,
			{ expiresIn: serverConfig.jwt_expire as string as unknown as number },
			(error, token) => {
				if (error) {
					reject(`Error generating JWT token: ${error.message}`);
				} else {
					resolve(token as string);
				}
			}
		);
	});
};

/**
 * Verifies a JWT token generated for user login.
 *
 * @param token - The JWT token to be verified.
 * @returns A Promise that resolves to the decoded payload containing user information.
 *          If the token is invalid or expired, the Promise will be rejected with an error message.
 */
export const verifyLoginToken = async (token: string): Promise<TokenData> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, serverConfig.jwt_secret, (err: any, decoded: any) => {
			if (err) {
				reject(`Invalid or expired token: ${err.message}`);
			} else {
				resolve(decoded as TokenData);
			}
		});
	});
};

/**
 * Generates a JWT token for email verification.
 *
 * @param payload - The payload containing user email information to be included in the token.
 * @returns A Promise that resolves to the generated email verification token as a string.
 *          If an error occurs during token generation, the Promise will be rejected with an error message.
 */
export const generateEmailVerificationToken = async (
	payload: EmailVerificationToken
): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			serverConfig.jwt_secret,
			{ expiresIn: serverConfig.jwt_expire as string as unknown as number },
			(error, token) => {
				if (error) {
					reject(`Error generating JWT token: ${error.message}`);
				} else {
					resolve(token as string);
				}
			}
		);
	});
};

/**
 * Verifies a JWT token for email verification.
 *
 * @param token - The JWT token to be verified.
 * @returns A Promise that resolves to the decoded payload containing email verification information.
 *          If the token is invalid or expired, the Promise will be rejected with an error message.
 */
export const verifyEmailVerificationToken = async (
	token: string
): Promise<EmailVerificationToken> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, serverConfig.jwt_secret, (err: any, decoded: any) => {
			if (err) {
				reject(`Invalid or expired email verification token: ${err.message}`);
			} else {
				resolve(decoded as EmailVerificationToken);
			}
		});
	});
};

/**
 * Generates a JWT token for password reset.
 *
 * @param payload - The payload containing user information needed for password reset.
 * @returns A Promise that resolves to the generated forgot password token as a string.
 *          If an error occurs during token generation, the Promise will be rejected with an error message.
 */
export const generateForgotPasswordToken = async (
	payload: ForgotPasswordToken
): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			serverConfig.forgotPasswordJwtSecret,
			{
				expiresIn:
					serverConfig.forgotPasswordJwtExpire as string as unknown as number,
			},
			(error, token) => {
				if (error) {
					reject(`Error generating forgot password token: ${error.message}`);
				} else {
					resolve(token as string);
				}
			}
		);
	});
};

/**
 * Verifies a JWT token for password reset.
 *
 * @param token - The JWT token to be verified.
 * @returns A Promise that resolves to the decoded payload containing forgot password information.
 *          If the token is invalid or expired, the Promise will be rejected with an error message.
 */
export const verifyForgotPasswordToken = async (
	token: string
): Promise<ForgotPasswordToken> => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			serverConfig.forgotPasswordJwtSecret,
			(err: any, decoded: any) => {
				if (err) {
					reject(`Invalid or expired forgot password token: ${err.message}`);
				} else {
					resolve(decoded as ForgotPasswordToken);
				}
			}
		);
	});
};
