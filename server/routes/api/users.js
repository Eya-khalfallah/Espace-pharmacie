const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/userController.js');
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin),usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports=  router;