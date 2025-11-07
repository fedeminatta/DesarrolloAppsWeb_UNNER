import mysql from 'mysql2/promise';
process.loadEnvFile(); // levanto las variables de entorno

export const conexion = await mysql.createConnection({
  // enviamos los datos al archivo .env 
  host: process.env.HOST,
  user: process.env.USER, 
  database: process.env.DATABASE,
  password: process.env.PASSWORD 

});