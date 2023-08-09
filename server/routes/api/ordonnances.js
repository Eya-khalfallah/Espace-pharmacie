const express = require('express');
const router = express.Router();
const ordonnanceController = require('../../controllers/ordonnanceConroller.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(ordonnanceController.getAllOrdonnances)
    .post( ordonnanceController.createNewOrdonnance)
    
    .delete( ordonnanceController.deleteOrdonnance);
router.route('/:id')
    .get(ordonnanceController.getOrdonnance);

    module.exports=  router;
