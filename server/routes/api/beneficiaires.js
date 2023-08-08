const express = require('express');
const router = express.Router();
const beneficiairesController = require('../../controllers/beneficiaireController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), beneficiairesController.getAllbeneficiaires)
    .post(verifyRoles(ROLES_LIST.Admin), beneficiairesController.createNewbeneficiaire)
    .delete(verifyRoles(ROLES_LIST.Admin), beneficiairesController.deletebeneficiaire);

router.route('/matricule')
    .get(verifyRoles(ROLES_LIST.Admin), beneficiairesController.getbeneficiaire);

module.exports=  router;