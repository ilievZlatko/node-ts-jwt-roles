import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { promises } from 'fs';

import { UserData } from '../typings/user.types';
import users from '../model/users.json';

dotenv.config();

const usersDB: UserData = {
	users,
	setUsers(data) {
		this.users = data;
	},
};

export const handleLogin = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

	const foundUser = usersDB.users.find((person) => person.username === username);
	if (!foundUser) return res.sendStatus(401);

	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles);

		const accessToken = jwt.sign(
			{
				userInfo: {
					username: foundUser.username,
					roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET!,
			{ expiresIn: '5m' },
		);

		const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET!, {
			expiresIn: '1d',
		});

		const otherUsers = usersDB.users.filter((person) => person.username !== foundUser.username);
		const currentUser = { ...foundUser, refreshToken };

		usersDB.setUsers([...otherUsers, currentUser]);

		await promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
		res.status(200).json({ accessToken });
	} else {
		res.status(401).json({ message: 'Invalid username or password' });
	}
};
