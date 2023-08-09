import express from 'express';
const router = express.Router();
import medicamentController from'../../controllers/medicamentController.js';

import ROLES_LIST from'../../config/roles_list.js';
import verifyRoles from'../../middleware/verifyRoles.js';

router.route('/')
    .get(medicamentController.getAllMedicaments)
    
    .delete(verifyRoles(ROLES_LIST.Admin), medicamentController.deleteMedicament);
router.route('/:id')
    .get(medicamentController.getMedicament);
    export default router;
