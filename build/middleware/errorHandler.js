"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logEvents_1 = require("./logEvents");
const errorHandler = (err, _, res) => {
    (0, logEvents_1.logEvents)(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
};
exports.errorHandler = errorHandler;
