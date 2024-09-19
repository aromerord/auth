const { response } = require('express');  // Opcional para el autocompletado
const { validationResult } = require('express-validator');

/**
 * Hace la validación de los campos
 */
const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      msg: errors.mapped()
    });
  }

  /* Se llama cuando va todo ok para que no se pare la ejecución 
    y continue con el siguiente middleware */
  next(); 
}

module.exports = {
  validateFields
}