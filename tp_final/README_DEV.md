## 🧠 README_DEV.md  
### Documentación técnica – Aplicación de Reservas

---

###  1. Tecnologías principales

- **Node.js** (v22+)  
- **Express.js** → Framework de servidor  
- **MySQL2** → Conexión a la base de datos  
- **Handlebars** → Plantillas para correos electrónicos  
- **Nodemailer** → Envío de correos automáticos  
- **JSON2CSV** → Exportación de reportes en CSV  
- **PDFKit** → Generación de reportes PDF  
- **dotenv** → Gestión de variables de entorno  

---

### 2. Estructura del proyecto

tp_final/
│
├── index.js # Punto de entrada principal
├── .env # Variables de entorno
├── package.json # Dependencias y scripts npm
│
├── src/
│ ├── db/
│ │ └── conexion.js # Configuración de conexión a MySQL
│ │
│ ├── servicios/
│ │ └── reportesServicio.js # Lógica de conexión a stored procedures
│ │
│ └── v1/
│ └── rutas/
│ └── reportesRutas.js # Endpoints HTTP para reportes
│
└── utiles/
└── handlebars/
└── plantilla.hbs # Plantilla HTML para correos


---

### 3. Conexión a la base de datos

Archivo: `src/db/conexion.js`

```js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const conexion = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

4. Stored Procedures

Los procedimientos almacenados deben cargarse en MySQL (archivo procedimientos.sql):

DELIMITER //

CREATE PROCEDURE sp_reservas_por_salon()
BEGIN
  SELECT s.titulo AS salon, COUNT(r.reserva_id) AS cantidad_reservas
  FROM reservas r
  JOIN salones s ON s.salon_id = r.salon_id
  GROUP BY s.titulo
  ORDER BY cantidad_reservas DESC;
END //

CREATE PROCEDURE sp_ingresos_por_mes()
BEGIN
  SELECT DATE_FORMAT(fecha_reserva, '%Y-%m') AS mes, SUM(importe_total) AS total_ingresos
  FROM reservas
  GROUP BY mes
  ORDER BY mes;
END //

CREATE PROCEDURE sp_servicios_mas_usados()
BEGIN
  SELECT s.descripcion, COUNT(rs.servicio_id) AS veces_contratado, SUM(rs.importe) AS total_recaudado
  FROM reservas_servicios rs
  JOIN servicios s ON s.servicio_id = rs.servicio_id
  GROUP BY s.descripcion
  ORDER BY veces_contratado DESC;
END //

DELIMITER ;

Los resultados se usan directamente desde Node.js mediante:

const [rows] = await conexion.query('CALL sp_reservas_por_salon()');

6. Rutas de reportes

Archivo: src/v1/rutas/reportesRutas.js

Incluye endpoints para:

Consultar reportes (JSON)

Descargar CSV y PDF

Enviar PDF por correo electrónico (funcionalidad extra)

Los endpoints comienzan en:
http://localhost:3000/api/reportes/...

7. Envío automático de PDF por correo

El envío se realiza con Nodemailer y un PDF generado dinámicamente con PDFKit.

Configuración en .env:

USER_EMAIL=tu_correo@gmail.com
PASS_EMAIL=tu_contraseña_app


Ruta para probar:

GET /api/reportes/enviar/salones/pdf


Esto genera un PDF con los resultados del procedimiento sp_reservas_por_salon() y lo envía al administrador.

8. Pruebas locales

Ejecutar el servidor:

npm start


Endpoints principales:

GET /estado → Verifica conexión

GET /api/reportes/estadisticas/salones → JSON

GET /api/reportes/exportar/salones/pdf → PDF descargable

GET /api/reportes/enviar/salones/pdf → PDF enviado por correo

9. Recomendaciones técnicas

Mantener las rutas API dentro de /src/v1/rutas para versionado futuro.

Centralizar la conexión en conexion.js para evitar duplicados.

Si se agregan más procedimientos, extender reportesServicio.js con funciones equivalentes.

Validar errores con try/catch y devolver siempre un JSON con { ok: false, mensaje: "..." }.



10. Dependencias

Listado de dependencias actuales del proyecto (package.json):

{
  "dependencies": {
    "express": "^5.1.0",
    "handlebars": "^4.7.8",
    "json2csv": "^6.0.0-alpha.2",
    "mysql2": "^3.15.3",
    "nodemailer": "^7.0.6",
    "pdfkit": "^0.17.2",
    "dotenv": "^16.4.5"
  }
}


Instalación rápida:

npm install

Extensión del sistema

Para agregar nuevos reportes:

Crear un nuevo procedimiento almacenado (sp_nuevo_reporte).

Agregar una función equivalente en reportesServicio.js.

Crear una ruta nueva en reportesRutas.js.


