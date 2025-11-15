import express from 'express';
import { check } from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js';
import ReservasControlador from '../controladores/reservasControlador.js'
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';


const router = express.Router();
const reservasControlador = new ReservasControlador();

//roles
const ROL_ADMIN = [1];
const ROL_EMPLEADO = [2];
const ROL_CLIENTE = [3];
const ROL_ADMIN_EMPLEADO = [...ROL_ADMIN,...ROL_EMPLEADO];
const ROL_ADMIN_CLIENTE =  [...ROL_ADMIN,...ROL_CLIENTE];
const TODOS = [...ROL_ADMIN, ...ROL_EMPLEADO, ...ROL_CLIENTE];


router.get('/', autorizarUsuarios(TODOS),reservasControlador.buscarTodos);

router.get('/:reserva_id',autorizarUsuarios(ROL_ADMIN_CLIENTE),reservasControlador.buscarPorId);

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
//Valida si el cuerpo no viene vacio
router.put('/:id', 
    autorizarUsuarios(ROL_ADMIN),
    [
      check().custom((value, { req }) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error('El cuerpo de la solicitud no puede estar vacío');
        }
        return true;
    }),
    check('fecha_reserva', 'Debe ingresar una fecha válida (YYYY-MM-DD)').optional().isDate(),
    check('salon_id', 'El salón es necesario').optional().isInt(),
    check('usuario_id','El usuario es necesario.').optional().isInt(),
    check('foto_cumpleaniero').optional(),
    check('turno_id', 'El turno es necesario').optional().isInt(),
    check('servicios','Faltan los servicios de la reserva.').optional().isArray(),
    check('servicios.*.importe').optional().isNumeric().withMessage('El importe debe ser numérico'),
    validarCampos
    ],reservasControlador.editar);

router.delete('/:id',autorizarUsuarios(ROL_ADMIN),reservasControlador.eliminar);


export {router};






