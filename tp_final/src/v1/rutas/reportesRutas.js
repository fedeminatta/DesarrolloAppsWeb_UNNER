import express from 'express';
import {
  obtenerEstadisticasSalones,
  obtenerIngresosPorMes,
  obtenerServiciosMasUsados,
  enviarReportePorCorreo,
} from '../../servicios/reportesServicio.js';

import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

//
// RUTAS PARA DATOS EN FORMATO JSON
//
router.get('/estadisticas/salones', async (req, res) => {
  try {
    const data = await obtenerEstadisticasSalones();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estadísticas de salones' });
  }
});

router.get('/estadisticas/ingresos', async (req, res) => {
  try {
    const data = await obtenerIngresosPorMes();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ingresos por mes' });
  }
});

router.get('/estadisticas/servicios', async (req, res) => {
  try {
    const data = await obtenerServiciosMasUsados();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener servicios más usados' });
  }
});

//
// EXPORTAR A CSV
//
router.get('/exportar/salones/csv', async (req, res) => {
  try {
    const data = await obtenerEstadisticasSalones();
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('reporte_salones.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar CSV de salones' });
  }
});

//
// EXPORTAR A PDF
//
router.get('/exportar/salones/pdf', async (req, res) => {
  try {
    const data = await obtenerEstadisticasSalones();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte_salones.pdf');

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
});

//
// ENVIAR REPORTE POR CORREO (funcionalidad extra)
//
router.get('/enviar/salones/pdf', async (req, res) => {
  try {
    await enviarReportePorCorreo(); // llamada al servicio
    res.json({ ok: true, mensaje: 'Correo enviado con el PDF adjunto.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al enviar el correo.' });
  }
});

export default router;
