import express from 'express';
import { check } from 'express-validator';
import ServiciosControlador from '../controladores/serviciosControlador.js';
import {validarCampos} from '../middlewares/validarCampos.js';

const serviciosControlador = new ServiciosControlador;
const router = express.Router();


router.get('/', serviciosControlador.buscarTodos);
router.get('/:servicio_id', serviciosControlador.buscarServicioPorId);
router.post('/', [
    check('descripcion','La descripción es necesaria.').notEmpty(),
    check('importe', 'El importe es necesario y debe ser numérico').notEmpty().isNumeric(),
    validarCampos
],
    serviciosControlador.agregar);
router.put('/:id', serviciosControlador.editar)
router.delete('/:id',serviciosControlador.eliminar);


export { router };