import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IToken } from '../types/token.type';

const verifyJWT = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
	const authHeader = req.headers.authorization || String(req.headers.Authorization);

	if (!authHeader?.startsWith('Bearer ')) {
		return res.sendStatus(401);
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
		if (err) return res.status(403).json({ message: err.message });
		/* @ts-ignore */
		req.username = (decoded as IToken).userInfo.username;
		/* @ts-ignore */
		req.roles = (decoded as IToken).userInfo.roles;
		next();
	});
};

export default verifyJWT;
