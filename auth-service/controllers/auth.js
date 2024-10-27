const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');
const errorCodes = require("../utils/errorCodes");

/**
 * Registro de usuario
 */
const register = async (req, res = response) => {

  const { name, email, password } = req.body;

  try {
    // Verificación del email
    let user = await User.findOne({ email });

    if(user){
      return res.status(400).json({
        ok: false,
        code: errorCodes.ERR400_EMAIL_REGISTERED.code,
        msg: errorCodes.ERR400_EMAIL_REGISTERED.msg,
      });
    }
    // Creación del objeto usuario
    user = new User(req.body);

    // Hash de la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // Generación del JWT
    const token = await generateJWT(user.id, user.role);

    // Guardado en la BD
    await user.save();

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
}

/**
 * Login de usuario
 */
const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});

    // Comprobación del email
    if(!user){
      return res.status(400).json({
        ok: false,
        code: errorCodes.ERR400.code,
        msg: errorCodes.ERR400.msg,
      });
    }
    // Comprobación de la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        code: errorCodes.ERR400.code,
        msg: errorCodes.ERR400.msg,
      });
    }
    // Generación JWT
    const token = await generateJWT(user.id, user.role);

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
}

/**
 * Renovación del token
 */
const renew = async (req, res) => {

  const { id } = req;

  const user = await User.findById(id);

  if(!user){
    return res.status(400).json({
      ok: false,
      code: errorCodes.ERR400.code,
      msg: errorCodes.ERR400.msg,
    });
  }

  // Generación JWT
  const token = await generateJWT(user.id, user.role);

  return res.json({
    id,
    name: user.name, 
    email: user.email,
    role: user.role,
    token
  });
}

module.exports = {
  register,
  login,
  renew
}