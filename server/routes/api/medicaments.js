import express from 'express';
import { Router } from 'express';

import medicamentController from'../../controllers/medicamentController';
import ROLES_LIST from'../../config/roles_list.js';
import verifyRoles from'../../middleware/verifyRoles';

router.route('/')
    .get(medicamentController.getAllMedicaments)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), medicamentController.updateMedicament)
    .delete(verifyRoles(ROLES_LIST.Admin), medicamentController.deleteMedicament);
router.route('/:id')
    .get(medicamentController.getMedicament);
    export default router;
