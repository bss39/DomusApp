// Importación de Módulos
const express = require('express');
const cors = require("cors");
const { conexionBD } = require('./database/configbd');
require('dotenv').config();

// Aplicación de express
const app = express();

// Conexion a la BD
conexionBD();   //conectar a la base de datos mysql

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/elementos', require('./routes/elementos'));
app.use('/api/acciones', require('./routes/acciones'));


// Escuchar en el puerto
app.listen(process.env.PUERTO, () => {
    console.log('Servidor escuchando en el puerto', process.env.PUERTO);
});