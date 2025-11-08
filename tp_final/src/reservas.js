import express from 'express';
import passport from 'passport';
import {estrategia, validacion} from './config/passport.js';
import {router as salonesRutas} from './rutas/salonesRutas.js';
import {router as serviciosRutas} from './rutas/serviciosRutas.js';
import {router as turnosRutas} from './rutas/turnosRutas.js';
import {router as reservasRutas} from './rutas/reservasRutas.js';
import {router as usuariosRutas} from './rutas/usuariosRutas.js';
import {router as authRutas} from './rutas/authRutas.js';

const app = express();
app.use(express.json());

//passport
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

app.use('/api/auth', authRutas);

const autenticacionJWT = passport.authenticate('jwt', {session:false});

app.use('/api/salones', autenticacionJWT,salonesRutas);

app.use('/api/servicios', autenticacionJWT,serviciosRutas);

app.use('/api/turnos', autenticacionJWT,turnosRutas);

app.use('/api/reservas', autenticacionJWT,reservasRutas)

app.use('/api/usuarios', autenticacionJWT,usuariosRutas);



export default app


