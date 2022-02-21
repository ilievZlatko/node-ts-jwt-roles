import { Request, Response } from 'express';
import User from '../model/User';

export const handleLogout = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
	// On client also delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	const foundUser = await User.findOne({ refreshToken }).exec();

	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
		return res.sendStatus(204);
	}

	// Delete the refreshToken
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
	res.sendStatus(204);
};
