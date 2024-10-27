const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/db');
require('dotenv').config(); // Carga las variables de entorno del archivo .env

// Crear aplicación de express
const app = express();

// Conexión con la BD
dbConnection();

// Directorio público
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));

// Levantar la aplicación
app.listen(process.env.PORT, () => {
    console.log(`Conexión con el servidor establecida en el puerto ${process.env.PORT}`);
});
