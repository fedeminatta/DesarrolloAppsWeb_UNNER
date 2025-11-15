import { 
  dbobtenerEstadisticasSalones,
  dbobtenerIngresosPorMes,
  dbobtenerServiciosMasUsados 
} from '../db/reportes.js';

import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import fs from 'fs';

//PROCEDIMIENTOS ALMACENADOS (ESTADÍSTICAS)
export const obtenerEstadisticasSalones =async () => {
  return await dbobtenerEstadisticasSalones();
}

export const obtenerIngresosPorMes = async () => {
  return await dbobtenerIngresosPorMes();
}

export const obtenerServiciosMasUsados = async () => {
  return await dbobtenerServiciosMasUsados();
}



// =========================================
// FUNCIONALIDAD EXTRA: ENVÍO DE REPORTE POR CORREO
// =========================================

export const enviarReportePorCorreo = async (destinatario = process.env.DEST_EMAIL) => {
  try {
    // Obtener datos del procedimiento almacenado
    const rows = await dbobtenerEstadisticasSalones();

    // Generar nombre del PDF con fecha y hora
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `./reporte_salones_${timestamp}.pdf`;

    // Crear PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Reporte de Reservas por Salón', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Generado el: ${new Date().toLocaleString()}`, { align: 'right' });
    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    rows.forEach((r) => {
      doc.fontSize(12).text(`${r.salon.padEnd(25, ' ')} ${r.cantidad_reservas} reservas`);
    });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

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
      to: destinatario,
      subject: 'Reporte de Reservas por Salón',
      text: 'Adjunto el reporte en formato PDF generado automáticamente.',
      attachments: [{ filename: 'reporte_salones.pdf', path: filePath }],
    };

    // Enviar correo y eliminar archivo temporal
    await transporter.sendMail(mailOptions);
    await fs.promises.unlink(filePath).catch(() => {});
    console.log('Correo enviado correctamente.');

  } catch (error) {
    console.error('Error al enviar el reporte:', error);
    throw error;
  }
};

