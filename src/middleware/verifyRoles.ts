import { Request, Response, NextFunction } from 'express';

type VerifyRoles = (
	...allowedRoles: Array<number | undefined>
) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;

const verifyRoles: VerifyRoles = (...allowedRoles: Array<number | undefined>) => {
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
