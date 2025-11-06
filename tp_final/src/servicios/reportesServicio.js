// src/servicios/reportesServicio.js
import { conexion } from '../db/conexion.js';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import fs from 'fs';

// =========================================
// PROCEDIMIENTOS ALMACENADOS (ESTADÍSTICAS)
// =========================================

export const obtenerEstadisticasSalones = async () => {
  const [rows] = await conexion.query('CALL sp_reservas_por_salon()');
  return rows[0];
};

export const obtenerIngresosPorMes = async () => {
  const [rows] = await conexion.query('CALL sp_ingresos_por_mes()');
  return rows[0];
};

export const obtenerServiciosMasUsados = async () => {
  const [rows] = await conexion.query('CALL sp_servicios_mas_usados()');
  return rows[0];
};

// =========================================
// FUNCIONALIDAD EXTRA: ENVÍO DE REPORTE POR CORREO
// =========================================

export const enviarReportePorCorreo = async () => {
  try {
    // Obtener datos del procedimiento
    const [rows] = await conexion.query(`
      SELECT s.titulo AS salon, COUNT(r.reserva_id) AS cantidad_reservas
      FROM reservas r
      JOIN salones s ON s.salon_id = r.salon_id
      GROUP BY s.titulo
      ORDER BY cantidad_reservas DESC
    `);

    // Generar PDF temporal
    const filePath = './reporte_salones.pdf';
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Reporte de Reservas por Salón', { align: 'center' });
    doc.moveDown();

    rows.forEach((r) => {
      doc.fontSize(12).text(`${r.salon}: ${r.cantidad_reservas} reservas`);
    });

    doc.end();

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    // Configurar correo
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.DEST_EMAIL,
      subject: 'Reporte de Reservas por Salón',
      text: 'Adjunto el reporte de reservas en formato PDF generado automáticamente.',
      attachments: [
        {
          filename: 'reporte_salones.pdf',
          path: filePath,
        },
      ],
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el reporte:', error);
    throw error;
  }
};
