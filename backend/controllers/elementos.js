const { response } = require("express");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('domus', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Elemento = require('../models/elementos')(sequelize);
const Accion = require('../models/acciones')(sequelize);

const getElementos = async(req, res = response) => {

    const textoBusq = req.query.texto;
    
    try {

        let elementos;

        if(!textoBusq){

            elementos = await Promise.all([
                Elemento.findAll()
            ]);

        } else {

            elementos = await Promise.all([
                Elemento.findAll({where: {
                    [Op.or]: [ { nombre: {[Op.like]: `%${textoBusq}%`}} ]
                }})
            ]);
        }
    
        res.json({
            ok: true,
            msg: "getElementos",
            elementos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getElementos"
        });
    }
    
}

const createElemento = async(req, res = response) => {

    const { nombre, estado, descripcion, icono} = req.body;

    try {
        
        if(nombre =="" || estado =="" || descripcion =="" || icono == ""){
            return res.status(400).json({
                ok: false,
                msg: "Es necesario cumplimentar todos los campos"
            });
        }

        const nombreExistente = await Elemento.findOne({where: {nombre}});
        
        if(nombreExistente) {
            return res.status(400).json({
                ok: false,
                msg: "El nombre del elemento ya existe"
            });
        }

        const newElemento = new Elemento(req.body);
        await newElemento.save();
    
        res.json({
            ok: true,
            msg: "createElemento",
            elemento: newElemento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear elemento"
        });
    }
    
}

const getElemento = async(req, res = response) => {
    
    const id = req.params.elementoid;

    try {

        let elemento = await Elemento.findByPk(id);

        if (!elemento) {
            return res.status(404).json({
                ok: true,
                msg: 'El elemento no existe'
            });
        }

        res.json({
                ok: true,
                msg: "getElemento",
                elemento
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error en getElemento"
        });
    }
    
}

const updateElemento = async(req, res = response) => {

    const id = req.params.elementoid;
    let { nombre, estado, descripcion, icono } = req.body;

    try {

        let elemento = await Elemento.findByPk(id);

        if (!elemento) {
            return res.status(404).json({
                ok: true,
                msg: 'El elemento no existe'
            });
        }

        if(nombre == "") { nombre = elemento.nombre; }
        if(estado == "") { estado = elemento.estado; }
        if(descripcion == "") { descripcion = elemento.descripcion; }
        if(icono == "") { icono = elemento.icono; }

        await Elemento.update({
                nombre, estado, descripcion, icono
            }, {where: {id}});
    
        const elementoActualizado = await Elemento.findByPk(id);

        res.json({
            ok: true,
            msg: "updateElemento",
            elementoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error al actualizar elemento"
        });
    }
    
}

const deleteElemento = async(req, res = response) => {

    const id = req.params.elementoid;

    try {

        let elemento = await Elemento.findByPk(id);

        if (!elemento) {
            return res.status(404).json({
                ok: true,
                msg: 'El elemento no existe'
            });
        }

        await Accion.destroy({  where: {elemento_id: id}, force: true });

        await Elemento.destroy({ where: { id }, force: true });
    
        res.json({
            ok: true,
            msg: "deleteElemento",
            idElementoEliminado: elemento.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: "Error al eliminar elemento"
        });
    }
    
}

module.exports = {
    getElementos,
    createElemento,
    getElemento,
    updateElemento,
    deleteElemento
};