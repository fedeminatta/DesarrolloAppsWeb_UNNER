import express from 'express';
import { check } from 'express-validator';
import TurnosControlador from '../controladores/turnosControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';

const turnosControlador = new TurnosControlador;
const router = express.Router();


router.get('/', turnosControlador.buscarTodos);
router.get('/:turno_id', turnosControlador.buscarPorId);
router.post('/', [
    check('orden','La orden es necesaria.').notEmpty(),
    check('hora_desde', 'La hora es necesaria').notEmpty(),
    check('hora_hasta', 'La hora es necesaria.').notEmpty(),
    validarCampos
],
    turnosControlador.agregar);
router.put('/:id', turnosControlador.editar)
router.delete('/:id',turnosControlador.eliminar);


export { router };