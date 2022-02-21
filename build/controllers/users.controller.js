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
exports.getUser = exports.deleteUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../model/User"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    if (!users)
        return res.status(204).json({ message: 'No users found' });
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ message: 'User ID required' });
    const user = yield User_1.default.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ message: `User ID ${req.body.id} not found` });
    }
    const result = yield user.deleteOne({ _id: req.body.id });
    res.json(result);
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ message: 'User ID required' });
    const user = yield User_1.default.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ message: `User ID ${req.params.id} not found` });
    }
    res.json(user);
});
exports.getUser = getUser;
