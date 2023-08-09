const express = require('express');
const router = express.Router();
const adherentsController = require('../../controllers/adherentController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), adherentsController.getAllAdherents)
    .post(verifyRoles(ROLES_LIST.Admin), adherentsController.createNewAdherent)

router.route('/matricule')
    .get(verifyRoles(ROLES_LIST.Admin), adherentsController.getAdherent)
    .delete(verifyRoles(ROLES_LIST.Admin), adherentsController.deleteAdherent);


module.exports=  router;