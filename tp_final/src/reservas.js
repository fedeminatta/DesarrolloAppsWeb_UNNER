import express from 'express';
import {router as salonesRutas} from './rutas/salonesRutas.js';
import {router as serviciosRutas} from './rutas/serviciosRutas.js';
import {router as turnosRutas} from './rutas/turnosRutas.js';
import {router as reservasRutas} from './rutas/reservasRutas.js'
const app = express();
app.use(express.json());

app.use('/api/salones',salonesRutas);

app.use('/api/servicios', serviciosRutas);

app.use('/api/turnos', turnosRutas);

app.use('/api/reservas',reservasRutas)
export default app


