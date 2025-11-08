import express from 'express';
import { check } from 'express-validator';
import SalonesControlador from '../controladores/salonesControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', salonesControlador.buscarTodos);
router.get('/:salon_id', salonesControlador.buscarSalonPorId);
router.put('/:id',salonesControlador.editar);
router.post('/', [
    check('titulo','El titulo es necesario.').notEmpty(),
    check('direccion','La dirección es necesaria.').notEmpty(),
    check('capacidad','La capacidad es necesaria y debe ser numérica.').notEmpty().isNumeric(),
    check('importe', 'El importe es necesario y debe ser numérico').notEmpty().isNumeric(),
    validarCampos
],
    salonesControlador.agregar);

router.delete('/:id',salonesControlador.eliminar);

export { router };