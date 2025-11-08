import express from 'express';
import UsuariosControlador from '../controladores/usuariosControlador.js';
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';

const usuariosControlador = new UsuariosControlador();
const router = express.Router();

const ROL_ADMIN = [1];
const ROL_ADMIN_Y_EMPLEADO = [1, 2];
const ROL_TODOS = [1, 2, 3];


router.get('/', autorizarUsuarios(ROL_ADMIN),usuariosControlador.buscarTodos);
router.get('/:id', autorizarUsuarios(ROL_ADMIN),usuariosControlador.buscarPorId);
router.post('/', autorizarUsuarios(ROL_ADMIN),usuariosControlador.agregar);
router.put('/:id', autorizarUsuarios(ROL_ADMIN),usuariosControlador.editar);
router.delete('/:id', autorizarUsuarios(ROL_ADMIN),usuariosControlador.eliminar);

export {router};
