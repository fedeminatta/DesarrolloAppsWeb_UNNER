import { conexion } from "./conexion.js";

export default class Salones{

    buscarTodos = async() => {
            const sql = 'SELECT * FROM salones WHERE activo = 1';
            const [salones] = await conexion.execute(sql);
            return salones;
        };

    buscarPorId = async(salon_id) => {
        const sql = 'SELECT  * FROM salones WHERE salon_id = ? AND activo = 1';
                const [salon] = await conexion.execute(sql, [salon_id]);

                if(salon.length ===0){
                    return null;
                }

                return salon[0];
    }
// verificamos si existe un registro con el mismo nombre
    existeTitulo = async (titulo, salon_id = null) => {
    const sql = 'SELECT * FROM salones WHERE LOWER(titulo) = LOWER(?) AND activo = 1';
    const [resultado] = await conexion.execute(sql, [titulo]);
    return resultado.length > 0;
};


    agregar = async (datosSalon) => {

            const existeDuplicado = await this.existeTitulo(datosSalon.titulo);
            if(existeDuplicado){
                return null
            };

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

            if(resultado.affectedRows === 0){
                return null;
            };
            

            return this.buscarPorId(resultado.insertId);
        };


    editar = async(salon_id,datosSalon) =>{

        const existeDuplicado = await this.existeTitulo(datosSalon.titulo);
            if(existeDuplicado){
                return null
            };
        
        const camposAActualizar = Object.keys(datosSalon);
        const valoresAActualizar = Object.values(datosSalon);

        const serValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
        
        const parametros = [...valoresAActualizar, salon_id];
        const sql = `UPDATE salones SET ${serValores} WHERE salon_id = ?`;

        const resultado = await conexion.execute(sql,parametros);

        if (resultado.affectedRows === 0){
            return null;
        }
        return this.buscarPorId(salon_id);
    }



    eliminar = async (salon_id) =>{
            const sql = 'UPDATE salones SET activo = 0 WHERE salon_id = ? AND activo = 1';
            const [resultado] = await conexion.execute(sql, [salon_id]);
            return resultado;
        };
}