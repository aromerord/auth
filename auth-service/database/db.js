const mongoose = require('mongoose');

/**
 * Conexión con la BD
 */
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión con la BD establecida')
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar con la BD');
  }
}

module.exports = { dbConnection }