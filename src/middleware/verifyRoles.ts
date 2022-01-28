import { Request, Response, NextFunction } from 'express';

const verifyRoles = (...allowedRoles: Array<number | undefined>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req?.roles) return res.sendStatus(401);

		const rolesArray = [...allowedRoles];
		console.log(rolesArray);
		console.log(req.roles);

		const result = Object.values(req.roles)
			.map((role: number) => rolesArray.includes(role))
			.find((val: boolean) => val === true);

		if (!result) return res.sendStatus(401);

		next();
	};
};

export default verifyRoles;
