const {Router} = require('express');
const {check} = require("express-validator");
const router = Router();

const {
    getUsuarios,
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuarios');

router.get('/', [
    check('nombre').optional()
], getUsuarios);

router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('pin', 'El argumento pin es obligatorio').not().isEmpty().isBase32(),
    check('administrador').isBoolean().optional()
], createUsuario);

router.get('/:usuarioid',[
    check('usuarioid', 'El id del usuario no es válido').exists().isBase32()
], getUsuario);

router.put('/:usuarioid', [
    check('usuarioid', 'El id del usuario no es válido').exists().isBase32(),
    check('nombre').optional(),
    check('pin').optional().isBase32()
], updateUsuario);

router.delete('/:usuarioid', [
    check('usuarioid', 'El id del usuario no es válido').exists().isBase32()
], deleteUsuario);

module.exports = router;