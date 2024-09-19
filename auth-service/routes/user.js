const { Router } = require('express');
const { validateJwt } = require('../middlewares/validate-jwt');
const { findAllUsers } = require('../controllers/user');

const router = Router();

router.get('/', validateJwt, findAllUsers);

module.exports = router;