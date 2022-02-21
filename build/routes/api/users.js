"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController = __importStar(require("../../controllers/users.controller"));
const rolesList_1 = __importDefault(require("../../config/rolesList"));
const verifyRoles_1 = __importDefault(require("../../middleware/verifyRoles"));
const router = express_1.default.Router();
router
    .route('/')
    .get((0, verifyRoles_1.default)(rolesList_1.default.Admin), usersController.getAllUsers)
    .delete((0, verifyRoles_1.default)(rolesList_1.default.Admin), usersController.deleteUser);
router.route('/:id').get((0, verifyRoles_1.default)(rolesList_1.default.Admin), usersController.getUser);
exports.default = router;
