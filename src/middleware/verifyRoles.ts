import { Request, Response, NextFunction } from 'express';

const verifyRoles = (...allowedRoles: Array<number | undefined>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		/* @ts-ignore */
		if (!req?.roles) return res.sendStatus(401);

		const rolesArray = [...allowedRoles];

		/* @ts-ignore */
		const result = Object.values(req.roles)
			/* @ts-ignore */
			.map((role: number) => rolesArray.includes(role))
			.find((val: boolean) => val === true);

		if (!result) return res.sendStatus(401);

		next();
	};
};

export default verifyRoles;
