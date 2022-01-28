import { Request, Response } from 'express';
import employeesJSON from '../model/employees.json';
import { EmployeeData, Employee } from '../typings/employee.type';

const data: EmployeeData = {
	employees: employeesJSON,
	setEmployees(data) {
		this.employees = data;
	},
};

// Get all employees
export const getAllEmployees = (_: Request, res: Response): void => {
	res.json(data.employees);
};

// Get employee by ID
export const getEmployee = (req: Request, res: Response) => {
	const employee = data.employees.find((emp) => emp.id === Number(req.params.id));

	if (!employee) {
		return res.status(400).json({ message: `Employee ID ${req.params.id} not found` });
	}

	res.status(200).json(employee);
};

// Create new employee
export const createNewEmployee = (req: Request, res: Response) => {
	const newEmployee: Employee = {
		id: data.employees[data.employees.length - 1].id + 1 || 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};

	if (!newEmployee.firstname || !newEmployee.lastname) {
		return res.status(400).json({ message: 'First and last names are required.' });
	}

	data.setEmployees([...data.employees, newEmployee]);
	res.status(201).json(data.employees);
};

// Update employee
export const updateEmployee = (req: Request, res: Response) => {
	const employee: Employee | undefined = data.employees.find((emp) => emp.id === Number(req.body.id));

	if (!employee) {
		return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
	}

	if (req.body.firstname) employee.firstname = req.body.firstname;
	if (req.body.lastname) employee.lastname = req.body.lastname;

	const filteredArray: Employee[] = data.employees.filter((emp) => emp.id !== Number(req.body.id));
	const unsortedArray: Employee[] = [...filteredArray, employee];

	data.setEmployees(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
	res.status(200).json(data.employees);
};

// Delete employee
export const deleteEmployee = (req: Request, res: Response) => {
	const employee = data.employees.find((emp) => emp.id === Number(req.body.id));

	if (!employee) {
		return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
	}

	const filteredArray: Employee[] = data.employees.filter((emp) => emp.id !== Number(req.body.id));
	data.setEmployees([...filteredArray]);
	res.status(200).json(data.employees);
};
