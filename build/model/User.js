"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Editor: Number,
        Admin: Number,
    },
    password: { type: String, required: true },
    refreshToken: String,
});
exports.default = (0, mongoose_1.model)('User', userSchema);
