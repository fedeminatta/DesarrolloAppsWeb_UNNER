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
    
}