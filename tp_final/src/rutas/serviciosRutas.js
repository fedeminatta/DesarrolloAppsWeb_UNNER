import express from 'express';
import { check } from 'express-validator';
import ServiciosControlador from '../controladores/serviciosControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';

const serviciosControlador = new ServiciosControlador;
const router = express.Router();

//roles
const ROL_ADMIN = [1];
const ROL_EMPLEADO = [2];
const ROL_CLIENTE = [3];
const ROL_ADMIN_EMPLEADO = [...ROL_ADMIN,...ROL_EMPLEADO];
const TODOS = [...ROL_ADMIN, ...ROL_EMPLEADO, ...ROL_CLIENTE];


router.get('/', autorizarUsuarios(TODOS),serviciosControlador.buscarTodos);

router.get('/:servicio_id', autorizarUsuarios(TODOS),serviciosControlador.buscarPorId);

router.post('/',
    autorizarUsuarios(ROL_ADMIN_EMPLEADO),
    [
    check('descripcion','La descripción es necesaria.').notEmpty(),
    check('importe', 'El importe es necesario y debe ser numérico').notEmpty().isNumeric(),
    validarCampos
],
    serviciosControlador.agregar);

router.put('/:id', autorizarUsuarios(ROL_ADMIN_EMPLEADO),serviciosControlador.editar)

router.delete('/:id',autorizarUsuarios(ROL_ADMIN_EMPLEADO),serviciosControlador.eliminar);


export { router };