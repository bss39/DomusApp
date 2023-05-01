const {Router} = require('express');
const {check} = require("express-validator");
const router = Router();

const {
    getAcciones,
    createAccion,
    getAccion,
    deleteAccion
} = require('../controllers/acciones');

router.get('/', [
    check('usuario_id').optional().isBase32(),
    check('elemento_id').optional().isBase32()
], getAcciones);

router.post('/', [
    check('descripcion', 'El argumento descripcion es obligatorio').not().isEmpty(),
    check('fecha', 'El fecha estado es obligatorio').not().isEmpty(),
    check('hora', 'El argumento descripcion es obligatorio').not().isEmpty(),
    check('usuario_id', 'El argumento usuario_id es obligatorio').not().isEmpty().isBase32(),
    check('elemento_id', 'El argumento elemento_id es obligatorio').not().isEmpty().isBase32()
], createAccion);

router.get('/:accionid', [
    check('accionid', 'El id de la acción no es válido').exists().isBase32()
], getAccion);

router.delete('/:accionid', [
    check('accionid', 'El id de la acción no es válido').exists().isBase32()
], deleteAccion);

module.exports = router;