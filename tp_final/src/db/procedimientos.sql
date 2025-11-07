USE reservas;

DELIMITER //
CREATE PROCEDURE sp_reservas_por_salon()
BEGIN
  SELECT s.titulo AS salon, COUNT(r.reserva_id) AS cantidad_reservas
  FROM reservas r
  JOIN salones s ON s.salon_id = r.salon_id
  GROUP BY s.titulo
  ORDER BY cantidad_reservas DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_ingresos_por_mes()
BEGIN
  SELECT 
    DATE_FORMAT(fecha_reserva, '%Y-%m') AS mes,
    SUM(importe_total) AS total_ingresos
  FROM reservas
  GROUP BY mes
  ORDER BY mes;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_servicios_mas_usados()
BEGIN
  SELECT 
    s.descripcion,
    COUNT(rs.servicio_id) AS veces_contratado,
    SUM(rs.importe) AS total_recaudado
  FROM reservas_servicios rs
  JOIN servicios s ON s.servicio_id = rs.servicio_id
  GROUP BY s.descripcion
  ORDER BY veces_contratado DESC;
END //
DELIMITER ;
