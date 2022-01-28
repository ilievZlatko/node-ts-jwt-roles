import { Request, Response } from 'express';
import { promises } from 'fs';
import path from 'path';

import { UserData } from '../typings/user.types';
import users from '../model/users.json';

const usersDB: UserData = {
	users,
	setUsers(data) {
		this.users = data;
	},
};

export const handleLogout = async (req: Request, res: Response) => {
	// On client also delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	const foundUser = usersDB.users.find((person) => person?.refreshToken === refreshToken);

	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
		return res.sendStatus(204);
	}

	// Delete the refreshToken
	const otherUsers = usersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
	const currentUser = { ...foundUser, refreshToken: '' };
	usersDB.setUsers([...otherUsers, currentUser]);
	await promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
	res.sendStatus(204);
};
