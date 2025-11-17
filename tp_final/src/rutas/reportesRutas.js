import express from 'express';
import  {
	getEstadisticasSalones,
	getIngresosPorMes,
	getServiciosMasUsados,
	exportarSalonesCSV,
	exportarSalonesPDF,	
	enviarSalonesPDFporCorreo,
} from '../controladores/reportesControlador.js';

const router = express.Router();

//datos en formato JSON
router.get('/estadisticas/salones', getEstadisticasSalones);
router.get('/estadisticas/ingresos', getIngresosPorMes);
router.get('/estadisticas/servicios', getServiciosMasUsados);

//exportar a CSV
router.get('/exportar/salones/csv', exportarSalonesCSV);

//exportar a PDF
router.get('/exportar/salones/pdf', exportarSalonesPDF);

//enviar reporte por correo
router.get('/enviar/salones/pdf', enviarSalonesPDFporCorreo);

export {router};
