const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles.js');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), registerController.handleNewUser);

module.exports= router;