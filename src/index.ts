import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

// Config imports
import corsOptions from './config/corsOptions';
import connectDB from './config/dbConn';

// Middleware imports
import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';
import verifyJWT from './middleware/verifyJWT';
import credentials from './middleware/credentials';

// Routes imports
import employeesRoute from './routes/api/employees';
import usersRoute from './routes/api/users';
import registerRoute from './routes/register';
import authRoute from './routes/auth';
import rootRoute from './routes/root';
import refreshRoute from './routes/refresh';
import logoutRoute from './routes/logout';

dotenv.config();

// connect to DB
connectDB();

// Config
const app: Application = express();
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
app.use('/users', usersRoute);

// Error handling
app.all('*', (_: Request, res: Response) => {
	res.status(404).json({
		error: '404 Not Found',
	});
});

app.use(errorHandler);

// Server starting
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
