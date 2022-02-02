import { Request, Response } from 'express';
import { logEvents } from './logEvents';

const errorHandler = (err: Error, _: Request, res: Response): void => {
	logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
	console.error(err.stack);
	res.status(500).send(err.message);
};

export { errorHandler };
