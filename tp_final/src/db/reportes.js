import {conexion}  from './conexion.js';

export const dbobtenerEstadisticasSalones = async () => {
  const [rows] = await conexion.query('CALL sp_reservas_por_salon()');
  return rows[0];
};

export const dbobtenerIngresosPorMes = async () => {
  const [rows] = await conexion.query('CALL sp_ingresos_por_mes()');
  return rows[0];
};

export const dbobtenerServiciosMasUsados = async () => {
  const [rows] = await conexion.query('CALL sp_servicios_mas_usados()');
  return rows[0];
};