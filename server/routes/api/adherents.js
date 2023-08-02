import express from 'express';
const router = express.Router();
import adherentsController from '../../controllers/adherentController.js'
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), adherentsController.getAllAdherents)
    .post(verifyRoles(ROLES_LIST.Admin), adherentsController.createNewAdherent)
    .delete(verifyRoles(ROLES_LIST.Admin), adherentsController.deleteAdherent);

router.route('/matricule')
    .get(verifyRoles(ROLES_LIST.Admin), adherentsController.getAdherent);

export default router;