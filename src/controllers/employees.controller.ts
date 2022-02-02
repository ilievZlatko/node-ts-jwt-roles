import { Request, Response } from 'express';
import Employee from '../model/Employee';

// Get all employees
export const getAllEmployees = async (_: Request, res: Response): Promise<void | Response<any>> => {
	const employees = await Employee.find();
	if (!employees) {
		return res.status(204).json({ message: 'Employees not found' });
	}

	res.status(200).json(employees);
};

// Get employee by ID
export const getEmployee = async (req: Request, res: Response): Promise<void | Response<any>> => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: 'ID parameter is required.' });
	}

	const employee = await Employee.findOne({ _id: req.params.id }).exec();

	if (!employee) {
		return res.status(204).json({ message: 'No employee matches ID' });
	}

	res.status(200).json(employee);
};

// Create new employee
export const createNewEmployee = async (req: Request, res: Response): Promise<void | Response<any>> => {
	if (!req?.body?.firstname || !req?.body?.lastname) {
		return res.status(400).json({ message: 'First and last names are requred!' });
	}

	try {
		const result = await Employee.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		});

		res.status(201).json(result);
	} catch (error) {
		console.error(error);
	}
};

// Update employee
export const updateEmployee = async (req: Request, res: Response): Promise<void | Response<any>> => {
	if (!req?.body?.id) {
		return res.status(204).json({ message: 'ID parameter is required.' });
	}

	const employee = await Employee.findOne({ _id: req.body.id }).exec();

	if (!employee) {
		return res.status(204).json({ message: 'No employee matches ID' });
	}

	if (req.body?.firstname) employee.firstname = req.body.firstname;
	if (req.body?.lastname) employee.lastname = req.body.lastname;

	const result = await employee.save();

	res.status(200).json(result);
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void | Response<any>> => {
	if (!req?.body?.id) return res.status(400).json({ message: 'Employee ID is required' });

	const employee = await Employee.findOne({ _id: req.body.id }).exec();

	if (!employee) {
		return res.status(204).json({ message: 'No employee matches ID' });
	}

	const result = await employee.deleteOne({ _id: req.body.id });

	res.status(200).json(result);
};
