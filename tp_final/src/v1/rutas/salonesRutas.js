import express from 'express';
import SalonesControlador from '../../controladores/salonesControlador.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', salonesControlador.buscarTodos);
router.get('/:id',(req, res) => salonesControlador.buscarPorId(req, res));

export { router };