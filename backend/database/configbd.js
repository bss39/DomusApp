//conexion a base de datos mysql
const mysql = require('mysql2');
require('dotenv').config();
const conexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'domus'
});

const conexionBD = async () => {
    await conexion.connect(function(error){
    if(error){
        console.error(error);
        return;
    }
    console.log('Base de datos conectada');
})}

module.exports = {conexionBD};