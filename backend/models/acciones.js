const {Sequelize, DataTypes, } = require('sequelize');
const sequelize = new Sequelize('mysql::memory');

module.exports = (sequelize) => {
    const Accion = sequelize.define('Accion', {
        descripcion: {
            type: DataTypes.STRING,
            required: true
        },
        fecha: {
            type: DataTypes.DATE,
            required: true
        },
        hora: {
            type: DataTypes.TIME,
            required: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        elemento_id: {
            type: DataTypes.INTEGER,
            required: true
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'accion'
    }
    );
    return Accion;
};