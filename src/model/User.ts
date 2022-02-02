import { Document, Schema, model } from 'mongoose';
import { Roles } from '../config/rolesList';

export interface IUser extends Document {
	username: string;
	roles: Roles;
	password: string;
	refreshToken?: string;
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	roles: {
		User: {
			type: Number,
			default: 2001,
		},
		Editor: Number,
		Admin: Number,
	},
	password: { type: String, required: true },
	refreshToken: String,
});

export default model<IUser>('User', userSchema);
