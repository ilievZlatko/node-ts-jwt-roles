"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createNewEmployee = exports.getEmployee = exports.getAllEmployees = void 0;
const Employee_1 = __importDefault(require("../model/Employee"));
// Get all employees
const getAllEmployees = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield Employee_1.default.find();
    if (!employees) {
        return res.status(204).json({ message: 'Employees not found' });
    }
    res.status(200).json(employees);
});
exports.getAllEmployees = getAllEmployees;
// Get employee by ID
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }
    const employee = yield Employee_1.default.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ message: 'No employee matches ID' });
    }
    res.status(200).json(employee);
});
exports.getEmployee = getEmployee;
// Create new employee
const createNewEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.firstname) || !((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.lastname)) {
        return res.status(400).json({ message: 'First and last names are requred!' });
    }
    try {
        const result = yield Employee_1.default.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createNewEmployee = createNewEmployee;
// Update employee
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    if (!((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.id)) {
        return res.status(204).json({ message: 'ID parameter is required.' });
    }
    const employee = yield Employee_1.default.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ message: 'No employee matches ID' });
    }
    if ((_e = req.body) === null || _e === void 0 ? void 0 : _e.firstname)
        employee.firstname = req.body.firstname;
    if ((_f = req.body) === null || _f === void 0 ? void 0 : _f.lastname)
        employee.lastname = req.body.lastname;
    const result = yield employee.save();
    res.status(200).json(result);
});
exports.updateEmployee = updateEmployee;
// Delete employee
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    if (!((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.id))
        return res.status(400).json({ message: 'Employee ID is required' });
    const employee = yield Employee_1.default.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ message: 'No employee matches ID' });
    }
    const result = yield employee.deleteOne({ _id: req.body.id });
    res.status(200).json(result);
});
exports.deleteEmployee = deleteEmployee;
