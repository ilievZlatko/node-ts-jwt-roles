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
exports.handleLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: 'Username and password are required.' });
    const foundUser = yield User_1.default.findOne({ username }).exec();
    if (!foundUser)
        return res.sendStatus(401);
    const match = yield bcrypt_1.default.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jsonwebtoken_1.default.sign({
            userInfo: {
                username: foundUser.username,
                roles,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        const refreshToken = jsonwebtoken_1.default.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
        foundUser.refreshToken = refreshToken;
        const result = yield foundUser.save();
        console.log(result);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken, roles });
    }
    else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});
exports.handleLogin = handleLogin;
