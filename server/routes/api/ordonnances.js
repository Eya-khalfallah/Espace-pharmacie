import express from 'express';
const  router = express.Router();
import ordonnanceController from'../../controllers/ordonnanceConroller.js';
import ROLES_LIST from'../../config/roles_list.js';
import verifyRoles from'../../middleware/verifyRoles.js';

router.route('/')
    .get(ordonnanceController.getAllOrdonnances)
    .post( ordonnanceController.createNewOrdonnance)
    
    .delete( ordonnanceController.deleteOrdonnance);
router.route('/:id')
    .get(ordonnanceController.getOrdonnance);

export default router;
