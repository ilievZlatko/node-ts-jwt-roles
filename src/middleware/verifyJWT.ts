import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization || String(req.headers.Authorization);

	if (!authHeader?.startsWith('Bearer ')) {
		return res.sendStatus(401);
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded: any) => {
		if (err) return res.status(403).json({ message: err.message });
		req.username = decoded.userInfo.username;
		req.roles = decoded.userInfo.roles;
		next();
	});
};

export default verifyJWT;
