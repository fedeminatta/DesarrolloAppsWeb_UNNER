import express from 'express';
import UsuariosControlador from '../controladores/usuariosControlador.js';
import autorizarUsuarios from '../middlewares/autorizarUsuarios.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';


const usuariosControlador = new UsuariosControlador();
const router = express.Router();

const ROL_ADMIN = [1];



router.get('/', autorizarUsuarios(ROL_ADMIN),usuariosControlador.buscarTodos);
router.get('/:id', autorizarUsuarios(ROL_ADMIN),usuariosControlador.buscarPorId);
router.post('/',
    autorizarUsuarios(ROL_ADMIN),
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('apellido', 'El apellido es requerido').not().isEmpty(),
        check('nombre_usuario','El nombre_usuario debe de ser un email valido').isEmail(),
        check('contrasenia','La contraseña es requerida').not().isEmpty(),
        check('tipo_usuario','El tipo_usuario es requerido y debe ser numérico').not().isEmpty().isInt(),
        validarCampos
    ],
    usuariosControlador.agregar
);

router.put('/:id',
    autorizarUsuarios(ROL_ADMIN),
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('apellido', 'El apellido es requerido').not().isEmpty(),
        check('nombre_usuario','El nombre_usuario debe de ser un email valido').isEmail(),
        check('tipo_usuario','El tipo_usuario es requerido y debe ser numérico').not().isEmpty().isInt(),
        validarCampos
    ],
    usuariosControlador.editar
);
router.delete('/:id', autorizarUsuarios(ROL_ADMIN),usuariosControlador.eliminar);

export {router};
