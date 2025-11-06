// src/v1/rutas/reportesRutas.js
import express from 'express';
import {
  obtenerEstadisticasSalones,
  obtenerIngresosPorMes,
  obtenerServiciosMasUsados,
} from '../../servicios/reportesServicio.js';

const router = express.Router();

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

export default router;
