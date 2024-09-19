const { response } = require('express');
const User = require('../models/User');

/**
 * Lista de todos los usuarios salvo administrador
 */
const findAllUsers = async (req, res) => { 

  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    return res.json({
      ok: true,
      users
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error en la aplicación, contacte con el administrador'
    });
  }

}

module.exports = {
  findAllUsers
}