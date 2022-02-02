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
exports.handleNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: 'Username and password are required.' });
    // Check for duplicate usernames
    const duplicate = yield User_1.default.findOne({ username }).exec();
    if (duplicate)
        return res.sendStatus(409);
    try {
        // encrypt the password
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
        const result = yield User_1.default.create({
            username: username,
            password: hashedPwd,
        });
        res.status(201).json({ success: `New user ${result.username} created!`, data: result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleNewUser = handleNewUser;
