"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_controller_1 = require("../../controllers/employees.controller");
const rolesList_1 = __importDefault(require("../../config/rolesList"));
const verifyRoles_1 = __importDefault(require("../../middleware/verifyRoles"));
const router = express_1.default.Router();
router
    .route('/')
    .get(employees_controller_1.getAllEmployees)
    .post((0, verifyRoles_1.default)(rolesList_1.default.Admin, rolesList_1.default.Editor), employees_controller_1.createNewEmployee)
    .put((0, verifyRoles_1.default)(rolesList_1.default.Admin, rolesList_1.default.Editor), employees_controller_1.updateEmployee)
    .delete((0, verifyRoles_1.default)(rolesList_1.default.Admin), employees_controller_1.deleteEmployee);
router.route('/:id').get(employees_controller_1.getEmployee);
exports.default = router;
