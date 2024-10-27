const { Router } = require('express');
const { validateJwt } = require('../middlewares/validate-jwt');
const { findAllUsers, deleteUserById } = require('../controllers/user');
const { validateAdminRole } = require('../middlewares/validate-admin-role');

const router = Router();

router.get('/', validateJwt, validateAdminRole, findAllUsers);
router.delete('/:id', validateJwt, validateAdminRole, deleteUserById);

module.exports = router;