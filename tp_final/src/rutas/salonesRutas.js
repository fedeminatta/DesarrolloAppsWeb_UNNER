import express from 'express';
import { check } from 'express-validator';
import SalonesControlador from '../controladores/salonesControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';
import { CamposPermitidos } from '../middlewares/validarCamposPermitidos.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', salonesControlador.buscarTodos);
router.get('/:salon_id', salonesControlador.buscarPorId);

router.post('/', [
    check('titulo','El titulo es necesario.').notEmpty(),
    check('direccion','La dirección es necesaria.').notEmpty(),
    check('latitud').optional(),
    check('longitud').optional(),
    check('capacidad','La capacidad es necesaria y debe ser numérica.').notEmpty().isNumeric(),
    check('importe', 'El importe es necesario y debe ser numérico').notEmpty().isNumeric(),
    CamposPermitidos([
        'titulo',
        'direccion',
        'latitud',
        'longitud',
        'capacidad',
        'importe'
    ]),

    validarCampos
],
    salonesControlador.agregar);

router.put('/:id',[
    check('titulo','El titulo es necesario.').optional().notEmpty(),
    check('direccion','La dirección es necesaria.').optional().notEmpty(),
    check('latitud').optional(),
    check('longitud').optional(),
    check('capacidad','La capacidad es necesaria y debe ser numérica.').optional().isNumeric().notEmpty(),
    check('importe', 'El importe es necesario y debe ser numérico').optional().isNumeric().notEmpty(),
    validarCampos
],salonesControlador.editar);


router.delete('/:id',salonesControlador.eliminar);

export { router };