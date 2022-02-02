import { Document, Schema, model } from 'mongoose';

export interface IEmployee extends Document {
	firstname: string;
	lastname: string;
}

const employeeSchema = new Schema<IEmployee>({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
});

export default model<IEmployee>('Employee', employeeSchema);
