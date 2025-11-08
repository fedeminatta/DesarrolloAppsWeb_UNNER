import jwt from 'jsonwebtoken';
import passport from 'passport';

export default class AuthControlador{
    login = async (req, res) =>{
        passport.authenticate('local', {session: false}, (err, usuario, info) => {

            if(err || !usuario){
                return res.status(400).json({
                    estado: false,
                    mensaje: info.mensaje || "Error de autenticacion."
                });
            }

            req.login(usuario, {session:false},(err) =>{
                if(err){
                    res.status(500).json({estado: false, mensaje: err});
                }

                const token = jwt.sign(usuario, process.env.JWT_SECRET, {expiresIn: '1h'});
                return res.json({
                    estado: true,
                    token: token
                });
            });
    })(req, res);
  }   
}