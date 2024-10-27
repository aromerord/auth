const { response } = require("express");
const jwt = require('jsonwebtoken');
const errorCodes = require("../utils/errorCodes");

/**
 * Comprueba que el token es valido y en caso de serlo, añade a la 
 * request id, name, email y role para generar un nuevo token
 */
const validateJwt = (req, res = response, next) => {

  // Se obtiene el token del header
  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      ok: false,
      code: errorCodes.ERR401_TOKEN.code,
      msg: errorCodes.ERR401_TOKEN.msg,
    });
  }

  try {
    // Se añade a la request el id
    const { id, role } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.id = id;
    req.role = role;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      code: errorCodes.ERR401_TOKEN.code,
      msg: errorCodes.ERR401_TOKEN.msg,
    });
  }

  next();
}

module.exports = {
  validateJwt
}