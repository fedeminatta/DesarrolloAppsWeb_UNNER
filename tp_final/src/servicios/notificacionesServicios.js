import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';
import {readFile} from 'fs/promises'



export default class Notificacion {
	
    enviarCorreo = async(datosCorreo) =>{
		
        const{fecha, salon, turno, correoDestino = process.env.DEST_EMAIL} = datosCorreo;

        if (!fecha || !salon || !turno || !correoDestino) {
			return {
            	estado: false, 
            	mensaje: 'Faltan datos obligatorios'
			};
        };

		try{

			const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const plantilla = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');

		const archivoHbs = await readFile(plantilla, 'utf-8');
		const template = handlebars.compile(archivoHbs);
		const html = template({ fecha, salon, turno });

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.USER_EMAIL,
				pass: process.env.PASS_EMAIL,
			},
		});

		const opciones = {
			from: process.env.USER_EMAIL,
			to: correoDestino,
			subject: 'Notificación de reserva.',
			cc: process.env.ADMIN_EMAIL,
			html,
		};
		
       const info = await transporter.sendMail(opciones);
			
				return { 
                    estado: true, 
                    mensaje: 'Correo enviado.',
					info
			    };

		} catch(error){
			console.error('Error al enviar el correo.');
			return{
				estado: false,
				mensaje: `Error interno al enviar el correo: ${error}`
			};
		};	
	};
}