import {conexion} from "./conexion.js";

export default class Servicios {

    buscarTodos = async() => {
        const sql = `SELECT * FROM servicios WHERE activo = 1`;
        const [servicios] = await conexion.execute(sql);
        return servicios;
    };

    buscarPorId = async(servicio_id) => {
        const sql = 'SELECT  * FROM servicios WHERE servicio_id = ? AND activo = 1';
                const [servicio] = await conexion.execute(sql, [servicio_id]);

                if(servicio.length ===0){
                    return null;
                }

                return servicio[0];
    };

    agregar = async (datosServicios) => {

            const sql = 'INSERT INTO servicios (descripcion, importe) VALUES (?,?)';
            const valores = [
                datosServicios.descripcion,
                datosServicios.importe
            ];
            const [resultado] = await conexion.execute(sql, valores);

            if(resultado.affectedRows === 0){
                return null;
            };

            return this.buscarPorId(resultado.insertId);
        };

    editar = async(servicio_id,datosServicios) =>{
        
        const camposAActualizar = Object.keys(datosServicios);
        const valoresAActualizar = Object.values(datosServicios);

        const serValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
        
        const parametros = [...valoresAActualizar, servicio_id];
        const sql = `UPDATE servicios SET ${serValores} WHERE servicio_id = ?`;

        const [resultado] = await conexion.execute(sql,parametros);

        if (resultado.affectedRows === 0){
            return null;
        }
        return this.buscarPorId(servicio_id);
    }



    eliminar = async (servicio_id) =>{
            const sql = 'UPDATE servicios SET activo = 0 WHERE servicio_id = ? AND activo = 1';
            const [resultado] = await conexion.execute(sql, [servicio_id]);
            return resultado;
        };


}