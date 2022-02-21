import { Request, Response } from 'express';
import User from '../model/User';

const getAllUsers = async (_: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
	const users = await User.find();
	if (!users) return res.status(204).json({ message: 'No users found' });
	res.json(users);
};

const deleteUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
	if (!req?.body?.id) return res.status(400).json({ message: 'User ID required' });
	const user = await User.findOne({ _id: req.body.id }).exec();
	if (!user) {
		return res.status(204).json({ message: `User ID ${req.body.id} not found` });
	}
	const result = await user.deleteOne({ _id: req.body.id });
	res.json(result);
};

const getUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
	if (!req?.params?.id) return res.status(400).json({ message: 'User ID required' });
	const user = await User.findOne({ _id: req.params.id }).exec();
	if (!user) {
		return res.status(204).json({ message: `User ID ${req.params.id} not found` });
	}
	res.json(user);
};

export { getAllUsers, deleteUser, getUser };
