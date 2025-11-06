import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import path from 'path';

// Cargar variables de entorno (.env)
process.loadEnvFile();

// Importamos las rutas de reportes
import reportesRutas from './src/v1/rutas/reportesRutas.js';

const app = express();
app.use(express.json());

// Usamos las rutas bajo el prefijo /api/reportes
app.use('/api/reportes', reportesRutas);

app.get('/estado', (req, res) => {
	res.json({ ok: true });
});

app.post('/notificacion', async (req, res) => {
	const { fecha, salon, turno, correoDestino } = req.body;

	if (!fecha || !salon || !turno || !correoDestino) {
		return res
			.status(400)
			.send({ estado: false, mensaje: 'Faltan datos obligatorios' });
	}

	try {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const plantilla = path.join(__dirname, 'utiles', 'handlebars', 'plantilla.hbs');

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
			to: correoDestino,
			subject: 'Notificación',
			html,
		};

		transporter.sendMail(opciones, (error) => {
			if (error) {
				return res.json({ ok: false, mensaje: 'Error al enviar el correo.' });
			}
			res.json({ ok: true, mensaje: 'Correo enviado.' });
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
	}
});

// 🔹 Iniciar servidor
const PORT = process.env.PUERTO || 3000;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
