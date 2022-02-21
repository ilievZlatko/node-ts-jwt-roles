"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOrigins = void 0;
exports.allowedOrigins = ['http://127.0.0.1:5000', 'http://127.0.0.1:3000', 'http://127.0.0.1:4000'];
const corsOptions = {
    origin(origin, callback) {
        if (!exports.allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
