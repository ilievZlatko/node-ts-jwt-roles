import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const promises = fs.promises;

const logEvents = async (message: string, logName: string): Promise<void> => {
	const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await promises.mkdir(path.join(__dirname, '..', 'logs'));
		}

		await promises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
	} catch (error) {
		console.log(error);
	}
};

const logger = (req: Request, _: Response, next: NextFunction): void => {
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
	console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
	next();
};

export { logger, logEvents };
