import { Roles } from '../config/rolesList';

export interface User {
	username: string;
	password: string;
	refreshToken?: string;
	roles: Roles;
}

export interface UserData {
	users: User[];
	setUsers: (users: User[]) => void;
}

declare global {
	namespace Express {
		interface Request {
			username: string;
			roles: Roles;
		}
	}
}
