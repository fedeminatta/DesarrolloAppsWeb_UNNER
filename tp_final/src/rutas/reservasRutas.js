import express from 'express';
import { check } from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import ReservasControlador from '../controladores/reservasControlador.js'


const router = express.Router();
const reservasControlador = new ReservasControlador();


router.get('/', reservasControlador.buscarTodos);
router.get('/:reserva_id',reservasControlador.buscarPorId);
router.post('/', [
    check('fecha_reserva','La fecha es necesaria').notEmpty(),
    check('fecha_reserva', 'Debe ingresar una fecha válida (YYYY-MM-DD)').isDate(),
    check('salon_id', 'El salón es necesario').notEmpty().isInt(),
    check('usuario_id','El usuario es necesario.').notEmpty().isInt(),
    check('foto_cumpleaniero').optional(),
    check('turno_id', 'El turno es necesario').notEmpty().isInt(),
    check('servicios','Faltan los servicios de la reserva.').notEmpty().isArray(),
    check('servicios.*.importe').isNumeric().withMessage('El importe debe ser numérico'),
    validarCampos
],
reservasControlador.agregar);
router.put('/:id',reservasControlador.editar);
router.delete('/:id',reservasControlador.eliminar);


export {router};






