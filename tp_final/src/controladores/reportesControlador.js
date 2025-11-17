import {
    obtenerEstadisticasSalones,
    obtenerIngresosPorMes,
    obtenerServiciosMasUsados,  
    enviarReportePorCorreo,
} from '../servicios/reportesServicio.js';
import {Parser} from 'json2csv';
import PDFDocument from 'pdfkit';

//Se obtiene estadisticas de salones en JSON
export const getEstadisticasSalones = async (req, res) => {
    try {
        const data = await obtenerEstadisticasSalones();
        res.json(data);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener estadisticas de salones'});
    }
};

//Obtener ingresos por mes en JSON
export const getIngresosPorMes = async (req, res) => {
    try {
        const data = await obtenerIngresosPorMes();
        res.json(data);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener ingresos por mes'});
    }
};

//Obtener servicios mas usados en JSON
export const getServiciosMasUsados = async (req, res) => {
    try {
        const data = await obtenerServiciosMasUsados();
        res.json(data);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener servicios mas usados'});
    }
};

//exportar a CSV
export const exportarSalonesCSV = async (req, res) => {
    try {
        const data = await obtenerEstadisticasSalones();
        const parser = new Parser();
        const csv = parser.parse(data);
        res.header ('Content-Type', 'text/csv');
        res.attachment('estadisticas_salones.csv');
        res.send(csv);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al generar CSV de salones'});
    }
}

//exportar a PDF
export const exportarSalonesPDF = async (req, res) => {
    try {
		const data = await obtenerEstadisticasSalones();

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			'attachment; filename=reporte_salones.pdf'
		);

		const doc = new PDFDocument();
		doc.pipe(res);

		doc.fontSize(18).text('Reporte de Reservas por Salón', { align: 'center' });
		doc.moveDown();

		data.forEach((row) => {
			doc.fontSize(12).text(`${row.salon}: ${row.cantidad_reservas} reservas`);
		});

		doc.end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al generar PDF de salones' });
	}
};

//enviar reporte por correo
export const enviarSalonesPDFporCorreo = async (req, res) => {
    try {
		const { to } = req.query;

		if (!to) {
			return res
				.status(400)
				.json({
					ok: false,
					mensaje: 'Debe especificar un correo destinatario (parámetro ?to=)',
				});
		}

		await enviarReportePorCorreo(to);
		res.json({ ok: true, mensaje: 'Correo enviado con el PDF adjunto.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ ok: false, mensaje: 'Error al enviar el correo.' });
	}
};