import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import path from 'path';

const app = express();
app.use(express.json());

app.get('/estado', (req, res) => {
	res.json({ ok: true });
});

app.post('/notificacion', async (req, res) => {
	const { fecha, salon, turno, correoDestino } = req.body;

	if (!fecha || !salon || !turno || !correoDestino) {
		res
			.status(400)
			.send({ estado: false, mensaje: 'Faltan datos obligatorios' });
	}

	try {
		const { fecha, salon, turno, correoDestino } = req.body;

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const plantilla = path.join(
			__dirname,
			'utiles',
			'handlebars',
			'plantilla.hbs'
		);

		const archivoHbs = await readFile(plantilla, 'utf-8');
		const template = handlebars.compile(archivoHbs);

		var html = template({ fecha: fecha, salon: salon, turno: turno });

		// datos para el envio de correo
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		const opciones = {
			to: correoDestino,
			subject: 'Notificación',
			html: html,
		};

		// enviar correo electrónico
		transporter.sendMail(opciones, (error, info) => {
			if (error) {
				res.json({ ok: false, mensaje: 'Error al enviar el correo.' });
			}
			res.json({ ok: true, mensaje: 'Correo enviado.' });
		});
	} catch (error) {
		console.log(error);
	}
});
