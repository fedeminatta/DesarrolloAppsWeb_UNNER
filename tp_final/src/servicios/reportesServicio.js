// src/servicios/reportesServicio.js
import { conexion } from '../db/conexion.js';

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
