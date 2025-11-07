import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';
import {readFile} from 'fs/promises'



export default class Notificacion {

    enviarCorreo = async(datosCorreo) =>{
     
        const{fecha, salon, turno, correoDestino} = datosCorreo;

        if (!fecha || !salon || !turno || !correoDestino) {
		return {
            estado: false, 
            mensaje: 'Faltan datos obligatorios'
	};
        }
			

    try {

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const plantilla = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');

		const archivoHbs = await readFile(plantilla, 'utf-8');
		const template = handlebars.compile(archivoHbs);
		const html = template({ fecha, salon, turno });

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		const opciones = {
			to: 'lurdesv1996@gmail.com',
			subject: 'Notificación',
			html,
		};

        transporter.sendMail(opciones, (error) => {
			if (error) {
				return res.json({ 
                    ok: false, 
                    mensaje: 'Error al enviar el correo.' });
			    }
			res.json({ 
                ok: true, 
                mensaje: 'Correo enviado.' 
            });
		});
	} catch (error) {

		console.log(error);
		res.status(500).json({ 
            ok: false, 
            mensaje: 'Error interno del servidor.' });
	}
    }
}




