import mongoose from 'mongoose';
import { GENDER, USER_STATUS } from '../../constants/key.constant';

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	gender: {
		type: String,
		required: true,
		trim: true,
		enum: GENDER,
	},
	dob: {
		type: Date,
		required: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	profileImage: {
		type: String,
		required: false,
	},
	phone: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 16,
	},
	status: {
		type: String,
		required: true,
		enum: USER_STATUS,
		default: USER_STATUS.ACTIVE,
	},
	passwordChangedAt: {
		type: Date,
		required: false,
	},
	forgotPasswordToken: {
		type: String,
		required: false,
	},
	forgotPasswordTokenExpires: {
		type: Date,
		required: false,
	},
	lastLoginDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
	loginCount: {
		type: Number,
		required: true,
		default: 0,
	},
	isEmailVerified: {
		type: Boolean,
		required: true,
		default: false,
	},
	emailVerificationToken: {
		type: String,
		required: false,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true,
	},
	isDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
	deletedReason: {
		type: String,
		required: false,
	},
	createdBy: {
		type: String,
		required: false,
	},
	updatedBy: {
		type: String,
		required: false,
	},
	deletedBy: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
	updatedAt: {
		type: Date,
		required: false,
	},
	deletedAt: {
		type: Date,
		required: false,
	},
});

export const UserModel = mongoose.model('user', schema);
