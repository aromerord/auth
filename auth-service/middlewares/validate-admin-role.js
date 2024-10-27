const { response } = require("express");
const errorCodes = require("../utils/errorCodes");

/**
 *  Verifica que el rol esté presente y sea 'admin' 
 */
const validateAdminRole = (req, res = response, next) => {

  if (req.role !== 'admin') {
    return res.status(403).json({
      ok: false,
      code: errorCodes.ERR403.code,
      msg: errorCodes.ERR403.msg,
    });
  }
  next();
};

module.exports = {
  validateAdminRole
}