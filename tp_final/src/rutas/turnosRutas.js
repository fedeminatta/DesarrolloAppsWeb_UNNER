import express from 'express';
import { check } from 'express-validator';
import TurnosControlador from '../controladores/turnosControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';
import { CamposPermitidos } from '../middlewares/validarCamposPermitidos.js'

const turnosControlador = new TurnosControlador;
const router = express.Router();


//roles
const ROL_ADMIN = [1];
const ROL_EMPLEADO = [2];
const ROL_CLIENTE = [3];
const ROL_ADMIN_EMPLEADO = [...ROL_ADMIN,...ROL_EMPLEADO];
const TODOS = [...ROL_ADMIN, ...ROL_EMPLEADO, ...ROL_CLIENTE];


router.get('/', autorizarUsuarios(TODOS),turnosControlador.buscarTodos);

router.get('/:turno_id', autorizarUsuarios(TODOS),turnosControlador.buscarPorId);

router.post('/', 
    autorizarUsuarios(ROL_ADMIN_EMPLEADO),
    [
    check('orden','La orden es necesaria.').notEmpty().isNumeric(),
    check('hora_desde', 'La hora es necesaria').notEmpty(),
    check('hora_hasta', 'La hora es necesaria.').notEmpty(),
    validarCampos,
    CamposPermitidos([
        'orden',
        'hora_desde',
        'hora_hasta'
    ])
],
    turnosControlador.agregar);

router.put('/:id', autorizarUsuarios(ROL_ADMIN_EMPLEADO),[
    check ('orden','La orden es necesaria.').optional().notEmpty().isNumeric(),
    check('hora_desde', 'La hora es necesaria').optional().notEmpty(),
    check('hora_hasta', 'La hora es necesaria').optional().notEmpty(),
    validarCampos,
    CamposPermitidos([
        'orden',
        'hora_desde',
        'hora_hasta'
    ])
],turnosControlador.editar)

router.delete('/:id',autorizarUsuarios(ROL_ADMIN_EMPLEADO),turnosControlador.eliminar);


export { router };