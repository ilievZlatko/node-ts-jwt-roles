import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/User';

export const handleNewUser = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
	const { username, password } = req.body;

	if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

	// Check for duplicate usernames
	const duplicate = await User.findOne({ username }).exec();

	if (duplicate) return res.sendStatus(409);

	try {
		// encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10);
		const result = await User.create({
			username: username,
			password: hashedPwd,
		});

		res.status(201).json({ success: `New user ${result.username} created!`, data: result });
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};
