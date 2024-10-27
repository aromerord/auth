const { response } = require('express');
const User = require('../models/User');
const errorCodes = require('../utils/errorCodes');

/**
 * Lista de todos los usuarios salvo administrador
 */
const findAllUsers = async (req, res = response) => { 

  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    return res.json(users);
    
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
 * Eliminar usuario por el id
 */
const deleteUserById = async (req, res = response) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        code: errorCodes.ERR404.code,
        msg: errorCodes.ERR404.msg,
      });
    }
    return res.json({
      ok: true
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


module.exports = {
  findAllUsers,
  deleteUserById
}