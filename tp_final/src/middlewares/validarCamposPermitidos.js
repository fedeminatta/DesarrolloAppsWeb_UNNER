import { validationResult } from "express-validator";

export const CamposPermitidos = (camposValidos = []) =>{
     return (req, res, next) => {

        const camposExtra = Object.keys(req.body).filter(
            (campo) => !camposValidos.includes(campo));

    if (camposExtra.length > 0){
        return res.status(400).json({
            estado: false,
            mensaje: `Campo no permitido: ${camposExtra.join(', ')}`
        });
    };

    next();

     }
    
}
