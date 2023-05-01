const { response } = require("express");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('domus', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Usuario = require('../models/usuarios')(sequelize);
const Accion = require('../models/acciones')(sequelize);

const getUsuarios = async(req, res = response) => {
    
    const nombreBusq = req.query.nombre;

    try {

        let usuarios;

        if(!nombreBusq) {

            usuarios = await Promise.all([
                Usuario.findAll()
            ]);

        } else {
            
            usuarios = await Promise.all([
                Usuario.findAll({where: {nombre: {[Op.like]: `%${nombreBusq}%`}}})
            ]);
        }
        
    
        res.json({
            ok: true,
            msg: "getUsuarios",
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getUsuarios"
        });
    }
    
}

const createUsuario = async(req, res = response) => {

    const { nombre, administrador } = req.body;

    try {
        
        const nombreExistente = await Usuario.findOne({where: {nombre}});
        
        if(nombreExistente) {
            return res.status(400).json({
                ok: false,
                msg: "El nombre del usuario ya existe"
            });
        }

        if(administrador === true || administrador === false
            || administrador === undefined){

            const newUsuario = new Usuario(req.body);
            await newUsuario.save();

            res.json({
                ok: true,
                msg: "createUsuario",
                usuario: newUsuario
            });

        } else {
            
            res.status(400).json({
                ok: false,
                msg: "El campo administrador no es válido"
            });
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear usuario"
        });
    }
}

const getUsuario = async(req, res = response) => {
    
    const id = req.params.usuarioid;

    try {

        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        res.json({
                ok: true,
                msg: "getUsuario",
                usuario
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getUsuario"
        });
    }
}

const updateUsuario = async(req, res = response) => {
    
    const id = req.params.usuarioid;
    let { nombre, pin, administrador } = req.body;

    try {

        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        if(nombre === "") { nombre = usuario.nombre; }
        if(pin === "") { pin = usuario.pin; }
        if(administrador === "") { administrador = usuario.administrador; }

        await Usuario.update({
                nombre, pin, administrador
            }, {where: {id}});
    
        const usuarioActualizado = await Usuario.findByPk(id);

        res.json({
            ok: true,
            msg: "updateUsuario",
            usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error al actualizar usuario"
        });
    }
}

const deleteUsuario = async(req, res = response) => {
    
    const id = req.params.usuarioid;

    try {

        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        await Accion.destroy({ where: {usuario_id: id}, force: true });

        await Usuario.destroy({ where: { id }, force: true });
    
        res.json({
            ok: true,
            msg: "deleteUsuario",
            idUsuarioEliminado: usuario.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error al eliminar usuario"
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
};