const {Sequelize, DataTypes, } = require('sequelize');
const sequelize = new Sequelize('mysql::memory');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: {
            type: DataTypes.STRING,
            required: true
        },
        pin: {
            type: DataTypes.NUMBER,
            required: true
        },
        administrador: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuario'
    }
    );
    return Usuario;
};