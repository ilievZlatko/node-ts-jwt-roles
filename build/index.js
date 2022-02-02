"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// Config imports
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
// Middleware imports
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = require("./middleware/errorHandler");
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
// Routes imports
const employees_1 = __importDefault(require("./routes/api/employees"));
const register_1 = __importDefault(require("./routes/api/register"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const root_1 = __importDefault(require("./routes/api/root"));
const refresh_1 = __importDefault(require("./routes/api/refresh"));
const logout_1 = __importDefault(require("./routes/api/logout"));
dotenv_1.default.config();
// connect to DB
(0, dbConn_1.default)();
// Config
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(logEvents_1.logger);
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/', root_1.default);
app.use('/register', register_1.default);
app.use('/auth', auth_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
// Protected routes with JWT
app.use(verifyJWT_1.default);
app.use('/employees', employees_1.default);
// Error handling
app.all('*', (_, res) => {
    res.status(404).json({
        error: '404 Not Found',
    });
});
app.use(errorHandler_1.errorHandler);
// Server starting
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
