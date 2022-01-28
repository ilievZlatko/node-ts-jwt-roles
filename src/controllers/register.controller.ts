import { Request, Response } from 'express';
import { promises } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

import users from '../model/users.json';
import { UserData } from '../typings/user.types';

const usersDB: UserData = {
	users,
	setUsers(data) {
		this.users = data;
	},
};

export const handleNewUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

	// Check for duplicate usernames
	const duplicate = usersDB.users.find((person) => person.username === username);

	if (duplicate) return res.sendStatus(409);

	try {
		// encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10);
		const newUser = {
			username: username,
			roles: { User: 2001 },
			password: hashedPwd,
		};
		usersDB.setUsers([...usersDB.users, newUser]);
		await promises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

		res.status(201).json({ success: `New user ${username} created` });
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};
