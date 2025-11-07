import express from 'express';
import { check } from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import ReservasControlador from '../controladores/reservasControlador.js'


const router = Express.Router();
const reservasControlador = new ReservasControlador();


router.get('/', reservasControlador.buscarTodos);
router.get('/:reserva_id',reservasControlador.buscarPorId);
router.post('/', [
    check('fecha_reserva','La fecha es necesaria'),
    check('salon_id', 'El salón es necesario'),
    check('usuario_id','El usuario es necesario.'),
    check('turno_id', 'El turno es necesario'),
    check('servicios','Faltan los servicios de la reserva.').notEmpty().isArray(),
    check('servicios.*.importe').isNumeric().withMessage('El importe debe ser numérico'),
    validarCampos
],
reservasControlador.crear);
router.put('/:id',reservasControlador.editar);
router.delete('/:id',reservasControlador.eliminar);


export {router};






