import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), registerController.handleNewUser);

export default router;