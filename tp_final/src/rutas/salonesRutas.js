import express from 'express';
import { check } from 'express-validator';
import SalonesControlador from '../controladores/salonesControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

//roles
const ROL_ADMIN = [1];
const ROL_EMPLEADO = [2];
const ROL_CLIENTE = [3];
const ROL_ADMIN_EMPLEADO = [...ROL_ADMIN,...ROL_EMPLEADO];
const TODOS = [...ROL_ADMIN, ...ROL_EMPLEADO, ...ROL_CLIENTE];




router.get('/', autorizarUsuarios(TODOS),salonesControlador.buscarTodos);

router.get('/:salon_id', autorizarUsuarios(TODOS),salonesControlador.buscarPorId);

router.put('/:id',autorizarUsuarios(ROL_ADMIN_EMPLEADO),salonesControlador.editar);

router.post('/', 
    autorizarUsuarios(ROL_ADMIN_EMPLEADO),
    [
    check('titulo','El titulo es necesario.').notEmpty(),
    check('direccion','La dirección es necesaria.').notEmpty(),
    check('capacidad','La capacidad es necesaria y debe ser numérica.').notEmpty().isNumeric(),
    check('importe', 'El importe es necesario y debe ser numérico').notEmpty().isNumeric(),
    validarCampos
],
    salonesControlador.agregar);

router.delete('/:id',autorizarUsuarios(ROL_ADMIN_EMPLEADO),salonesControlador.eliminar);

export { router };