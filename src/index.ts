import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Config imports
import corsOptions from './config/corsOptions';

// Middleware imports
import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';
import verifyJWT from './middleware/verifyJWT';
import credentials from './middleware/credentials';

// Routes imports
import employeesRoute from './routes/api/employees';
import registerRoute from './routes/api/register';
import authRoute from './routes/api/auth';
import rootRoute from './routes/api/root';
import refreshRoute from './routes/api/refresh';
import logoutRoute from './routes/api/logout';

// Config
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', rootRoute);
app.use('/register', registerRoute);
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);

// Protected routes with JWT
app.use(verifyJWT);
app.use('/employees', employeesRoute);

// Error handling
app.all('*', (_: Request, res: Response) => {
	res.status(404).json({
		error: '404 Not Found',
	});
});

app.use(errorHandler);

// Server starting
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
