const { response } = require("express");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('domus', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Accion = require('../models/acciones')(sequelize);
const Usuario = require('../models/usuarios')(sequelize);
const Elemento = require('../models/elementos')(sequelize);

const getAcciones = async(req, res = response) => {

    const textoBusq = req.query.texto;

    try {

        let acciones;

        if(!textoBusq){
            
            acciones = await Promise.all([
                Accion.findAll({order:[['fecha', 'DESC'],['hora','DESC']]})
            ]);

        } else {

            acciones = await Promise.all([
                Accion.findAll({
                        where: {fecha: new Date(textoBusq)},
                        order: [ ['hora','DESC'] ]       
                })
            ]);

        }
    
        res.json({
            ok: true,
            msg: "getAcciones",
            acciones
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getAcciones"
        });
    }
    
}

const createAccion = async(req, res = response) => {

    try {

        const usuario = await Usuario.findByPk(req.body.usuario_id);
        const elemento = await Elemento.findByPk(req.body.elemento_id);

        if(!usuario || !elemento) {
            return res.status(404).json({
                ok: true,
                msg: 'El usuario o el elemento no existen'
            });
        }

        const newAccion = new Accion(req.body);
        await newAccion.save();

        res.json({
            ok: true,
            msg: "createAccion",
            accion: newAccion
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear accion"
        });
    }
}

const getAccion = async(req, res = response) => {
    
    const id = req.params.accionid;

    try {

        let accion = await Accion.findByPk(id);

        if (!accion) {
            return res.status(404).json({
                ok: true,
                msg: 'La accion no existe'
            });
        }

        res.json({
                ok: true,
                msg: "getAccion",
                accion
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getAccion"
        });
    }
}

const deleteAccion = async(req, res = response) => {
    
    const id = req.params.accionid;

    try {

        let accion = await Accion.findByPk(id);

        if (!accion) {
            return res.status(404).json({
                ok: true,
                msg: 'La accion no existe'
            });
        }

        await Accion.destroy({ where: { id }, force: true });
    
        res.json({
            ok: true,
            msg: "deleteAccion",
            idAccionEliminada: accion.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error al eliminar accion"
        });
    }
}

module.exports = {
    getAcciones,
    createAccion,
    getAccion,
    deleteAccion
};