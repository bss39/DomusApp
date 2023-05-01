const {Router} = require('express');
const {check} = require("express-validator");
const router = Router();

const {
    getElementos,
    createElemento,
    getElemento,
    updateElemento,
    deleteElemento
} = require('../controllers/elementos');

router.get('/', [
    check('texto').optional()
], getElementos);

router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('estado', 'El argumento estado es obligatorio').not().isEmpty(),
    check('descripcion', 'El argumento descripcion es obligatorio').not().isEmpty()
], createElemento);

router.get('/:elementoid', [
    check('elementoid', 'El id del elemento no es válido').exists().isBase32()
], getElemento);

router.put('/:elementoid', [
    check('elementoid', 'El id del elemento no es válido').exists().isBase32(),
    check('nombre').optional(),
    check('estado').optional(),
    check('descripcion').optional()
], updateElemento);

router.delete('/:elementoid', [
    check('elementoid', 'El id del elemento no es válido').exists().isBase32()
], deleteElemento);

module.exports = router;