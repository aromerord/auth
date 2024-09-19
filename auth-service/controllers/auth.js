const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');

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
        msg: 'El email ya está registrado'
      });
    }
    // Creación del objeto usuario
    user = new User(req.body);

    // Hash de la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // Generación del JWT
    const token = await generateJWT(user.id);

    // Guardado en la BD
    await user.save();

    return res.status(201).json({
      ok: true,
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
      msg: 'Se ha producido un error en la aplicación, contacte con el administrador'
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
        msg: 'Credenciales incorrectas'
      });
    }
    // Comprobación de la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      });
    }
    // Generación JWT
    const token = await generateJWT(user.id);

    return res.status(201).json({
      ok: true,
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
      msg: 'Se ha producido un error en la aplicación, contacte con el administrador'
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
      msg: 'Credenciales incorrectas'
    });
  }

  // Generación JWT
  const token = await generateJWT(id);

  return res.json({
    ok: true,
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