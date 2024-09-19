const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renew } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/register',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({min: 6}),
  validateFields  
], register);

router.post('/login',[
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({min: 6}),
  validateFields
], login);

router.get('/renew', validateJwt, renew);

module.exports = router;