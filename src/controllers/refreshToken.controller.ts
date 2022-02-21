import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';

export const handleRefreshToken = async (
	req: Request,
	res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;
	const foundUser = await User.findOne({ refreshToken }).exec();

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
		res.json({ roles, accessToken });
	});
};
