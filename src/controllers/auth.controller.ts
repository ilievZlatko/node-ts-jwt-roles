import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';

export const handleLogin = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

	const foundUser = await User.findOne({ username }).exec();
	if (!foundUser) return res.sendStatus(401);

	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);

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

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		console.log(result);

		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
		res.status(200).json({ accessToken, roles });
	} else {
		res.status(401).json({ message: 'Invalid username or password' });
	}
};
