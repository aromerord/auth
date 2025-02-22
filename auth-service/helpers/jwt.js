const jwt = require('jsonwebtoken');

/**
 * Genera un JWT
 */
const generateJWT = (id, role) => {

  const payload =  { id, role };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, (error, token)=> {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  })
}

module.exports = {
  generateJWT
}