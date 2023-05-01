const {Sequelize, DataTypes, } = require('sequelize');
const sequelize = new Sequelize('mysql::memory');

module.exports = (sequelize) => {
    const Elemento = sequelize.define('Elemento', {
        nombre: {
            type: DataTypes.STRING,
            required: true
        },
        estado: {
            type: DataTypes.STRING,
            required: true
        },
        descripcion: {
            type: DataTypes.STRING,
            required: true
        },
        icono: {
            type: DataTypes.STRING,
            required: true
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'elemento'
    }
    );
    return Elemento;
};