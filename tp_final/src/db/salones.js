import { conexion } from "./conexion.js";

export default class Salones {

    buscarTodos = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.execute(sql);
        return salones;
    }

    buscarSalonPorId = async(id) => {
        const sql = 'SELECT  * FROM salones WHERE salon_id = ? AND activo = 1';
        const [salon] = await conexion.execute(sql, [id]);
        return salon[0];
    }

    agregar = async (datosSalon ) => {
        const sql = 'INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo) VALUES (?,?,?,?,?,?,1)';
        const valores = [
            datosSalon.titulo,
            datosSalon.direccion,
            datosSalon.latitud,
            datosSalon.longitud,
            datosSalon.capacidad,
            datosSalon.importe
        ];
        const [resultado] = await conexion.execute(sql, valores);
        return resultado;
    }

    editar = async (id, datosSalon) => {
        const sql = `UPDATE salones SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ? 
        WHERE salon_id = ? AND activo = 1 `;
        const  valores = [
            datosSalon.titulo,
            datosSalon.direccion,
            datosSalon.latitud,
            datosSalon.longitud,
            datosSalon.capacidad,
            datosSalon.importe,
            id
        ];
        const [resultado] = await conexion.execute(sql, valores);
        return resultado;
    }
    

    eliminar = async (id) =>{
        const sql = 'UPDATE salones SET activo = 0 WHERE salon_id = ? AND activo = 1';
        const [resultado] = await conexion.execute(sql, [id]);
        return resultado;
    }
}