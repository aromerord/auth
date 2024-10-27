const errorCodes = {
  ERR400: { code: 'err400', msg: 'Credenciales incorrectas' },
  ERR400_EMAIL_REGISTERED: { code: 'err400_email_registered', msg: 'El email ya está registrado' },
  ERR401_TOKEN: { code: 'err401_token', msg: 'Token no válido' },
  ERR403: { code: 'err403', msg: 'No tiene permisos para acceder al recurso.' },
  ERR404: { code: 'err404', msg: 'El registro no ha sido encontrado' },
  ERR500: { code: 'err500', msg: 'Error interno del servidor' }
};

module.exports = errorCodes;