export interface Employee {
	id: number;
	firstname: string;
	lastname: string;
}

export interface EmployeeData {
	employees: Employee[];
	setEmployees: (data: Employee[]) => void;
}
