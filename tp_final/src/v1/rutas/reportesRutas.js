import express from 'express';
import {
  obtenerEstadisticasSalones,
  obtenerIngresosPorMes,
  obtenerServiciosMasUsados,
} from '../../servicios/reportesServicio.js';

import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

//
// RUTAS PARA DATOS EN FORMATO JSON
//

// Reservas por salón
router.get('/estadisticas/salones', async (req, res) => {
  try {
    const data = await obtenerEstadisticasSalones();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estadísticas de salones' });
  }
});

// Ingresos por mes
router.get('/estadisticas/ingresos', async (req, res) => {
  try {
    const data = await obtenerIngresosPorMes();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ingresos por mes' });
  }
});

// Servicios más usados
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

    // Configuración del PDF
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

export default router;

