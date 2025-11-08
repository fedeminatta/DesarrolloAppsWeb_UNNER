import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import UsuariosServicios from '../servicios/usuariosServicios.js'; 



//estrategia local
const estrategia = new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia'
},
    async (nombre_usuario, constrasenia, done) => {
        try{
            const usuariosServicios = new UsuariosServicios();
            const usuario = await usuariosServicios.buscar(nombre_usuario, constrasenia);

            if(!usuario){
                return done (null, false, {mensaje: 'Login incorrecto'})
            }

            return done(null, usuario, {mensaje: 'Login correcto!'})
        }catch (exc){
            return done (exc);
        }
    }
);

//estrategia JWT
const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtpayload, done) => {
        const usuariosServicios = new UsuariosServicios();
        const usuario = await usuariosServicios.buscarPorId(jwtpayload.usuario_id);

        if(!usuario){
            return done(null, false, {mensaje: 'Token incorrecto'});
        }

        return done (null, usuario);
    }
);

export {estrategia, validacion};