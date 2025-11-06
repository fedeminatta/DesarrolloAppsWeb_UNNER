import { conexion } from './src/db/conexion.js';

try {
  const [rows] = await conexion.query('SELECT NOW() AS fecha_actual');
  console.log('✅ Conexión exitosa:', rows);
} catch (err) {
  console.error('❌ Error al conectar:', err.message);
}
