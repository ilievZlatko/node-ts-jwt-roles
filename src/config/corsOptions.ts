import { CorsOptions } from 'cors';

export const allowedOrigins: string[] = ['http://127.0.0.1:5000', 'http://127.0.0.1:3000', 'http://127.0.0.1:4000'];

const corsOptions: CorsOptions = {
	origin(origin, callback) {
		if (!allowedOrigins.includes(origin as string) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
