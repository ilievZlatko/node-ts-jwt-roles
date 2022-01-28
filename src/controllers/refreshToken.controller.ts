import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UserData } from '../typings/user.types';
import users from '../model/users.json';

dotenv.config();

const usersDB: UserData = {
	users,
	setUsers(data) {
		this.users = data;
	},
};

export const handleRefreshToken = (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;
	const foundUser = usersDB.users.find((person) => person?.refreshToken === refreshToken);

	if (!foundUser) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
		if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
		const roles = Object.values(foundUser.roles);
		const accessToken = jwt.sign(
			{
				userInfo: {
					username: decoded.usernmae,
					roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: '5m' },
		);
		res.json({ accessToken });
	});
};
