README_TESTS.md
Pruebas del Módulo de Reportes y Funcionalidad Extra

Este documento describe cómo probar paso a paso la funcionalidad implementada Reporte y funcionalidad extra del Trabajo Final Integrador.

1. Verificar los Stored Procedures
Objetivo

Confirmar que los procedimientos almacenados existen y devuelven datos correctos.

Comando SQL
CALL sp_reservas_por_salon();
CALL sp_ingresos_por_mes();
CALL sp_servicios_mas_usados();

Resultado esperado

Cada consulta devuelve filas con datos:

sp_reservas_por_salon: salones y cantidad de reservas

sp_ingresos_por_mes: mes y total de ingresos

sp_servicios_mas_usados: servicios más contratados

Verificar la conexión desde Node.js
Comando
node test-db.js

Resultado esperado
Conectado a la base de datos MySQL correctamente

3. Endpoints de estadísticas JSON
URLs a probar
Tipo	URL
Reservas por salón	http://localhost:3000/api/reportes/estadisticas/salones
Ingresos por mes	http://localhost:3000/api/reportes/estadisticas/ingresos
Servicios más usados	http://localhost:3000/api/reportes/estadisticas/servicios
Resultado esperado

Respuestas JSON similares a:

[
  { "salon": "Secundario", "cantidad_reservas": 2 },
  { "salon": "Principal", "cantidad_reservas": 1 }
]

4. Exportar a CSV
URL
http://localhost:3000/api/reportes/exportar/salones/csv

Resultado esperado

Descarga automática del archivo reporte_salones.csv.

Al abrirlo, muestra los datos tabulados (salón, cantidad_reservas, etc.).

5. Exportar a PDF
URL
http://localhost:3000/api/reportes/exportar/salones/pdf

Resultado esperado

Descarga del archivo reporte_salones.pdf con formato legible y título:

“Reporte de Reservas por Salón”

6. Envío del Reporte por Correo (Funcionalidad Extra)
URL
http://localhost:3000/api/reportes/enviar/salones/pdf?to=diegocor4@gmail.com 
(usar mail destino)

Variables requeridas en .env
USER_EMAIL=tu_correo@gmail.com
PASS_EMAIL=contraseña_de_aplicacion
DEST_EMAIL=correo_destino@ejemplo.com



En consola:
Correo enviado con el PDF adjunto.

En la bandeja del destinatario:
Correo con el archivo reporte_salones.pdf adjunto.

7. Test automatizado de rutas
Archivo

test-reportes.js

Ejecución
node test-reportes.js

Resultado esperado
Iniciando pruebas de reportes...
/estadisticas/salones [ ... ]
/estadisticas/ingresos [ ... ]
/estadisticas/servicios [ ... ]
/exportar/salones/csv Archivo descargado o respuesta no JSON.
/exportar/salones/pdf Archivo descargado o respuesta no JSON.

8. Checklist de validación final
Verificación	Resultado esperado
Conexión MySQL	Exitosa
Stored Procedures	Devuelven datos
API de estadísticas	Responde con JSON
Exportar CSV	Descarga correcta
Exportar PDF	Descarga correcta
Envío de correo	Correo recibido con adjunto


Generar una contraseña de aplicación en gmail:

 Gmail (Google)

Inicia sesión en tu cuenta de Google: https://myaccount.google.com

Ve a Seguridad (menú lateral izquierdo).

En el apartado "Acceso de Google", asegúrate de tener activada la verificación en dos pasos.

Una vez activada, vuelve a Seguridad → Contraseñas de aplicaciones.
(O entra directamente: https://myaccount.google.com/apppasswords
)

En “Seleccionar aplicación”, elige Correo o Otra (nombre personalizado), y pon algo como “Servidor Node.js”.

En “Seleccionar dispositivo”, elige “Otro” o “Computadora”.

Haz clic en Generar.

Google te mostrará una contraseña de 16 caracteres.
Ejemplo: abcd efgh ijkl mnop

Usá esa contraseña (sin espacios) en tu archivo .env:

USER_EMAIL=tu_correo@gmail.com
PASS_EMAIL=abcd efgh ijkl mnop