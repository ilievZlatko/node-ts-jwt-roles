import express from 'express';
import * as usersController from '../../controllers/users.controller';
import ROLES_LIST from '../../config/rolesList';
import verifyRoles from '../../middleware/verifyRoles';

const router = express.Router();

router
	.route('/')
	.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
	.delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

export default router;
