const { response } = require("express");
const jwt = require('jsonwebtoken');

/**
 * Comprueba que el token es valido y en caso de serlo, añade a la 
 * request el id y el name para generar un nuevo token
 */
const validateJwt = (req, res = response, next) => {

  // Se obtiene el token del header
  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    });
  }

  try {

    // Se añaden a la request el id, el name y el email
    const {id, name, email} = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.id = id;
    req.name = name;
    req.email = email;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }
  next();
}

module.exports = {
  validateJwt
}