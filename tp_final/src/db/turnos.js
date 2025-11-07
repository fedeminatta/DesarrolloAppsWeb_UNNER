import {conexion} from "./conexion.js";

export default class Turnos {

    buscarTodos = async() => {
        const sql = `SELECT * FROM turnos WHERE activo = 1`;
        const [turnos] = await conexion.execute(sql);
        return turnos;
    };

    buscarPorId = async(turno_id) => {
        const sql = 'SELECT  * FROM turnos WHERE turno_id = ? AND activo = 1';
                const [turno] = await conexion.execute(sql, [turno_id]);

                if(turno.length ===0){
                    return null;
                }

                return turno[0];
    };

    agregar = async (datosTurnos) => {

            const sql = 'INSERT INTO turnos (orden,hora_desde,hora_hasta) VALUES (?,?,?)';
            const valores = [
                datosTurnos.orden,
                datosTurnos.hora_desde,
                datosTurnos.hora_hasta
            ];
            const [resultado] = await conexion.execute(sql, valores);

            if(resultado.affectedRows === 0){
                return null;
            };

            return this.buscarPorId(resultado.insertId);
        };

    editar = async(turno_id,datosTurnos) =>{
        
        const camposAActualizar = Object.keys(datosTurnos);
        const valoresAActualizar = Object.values(datosTurnos);

        const serValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
        
        const parametros = [...valoresAActualizar, turno_id];
        const sql = `UPDATE turnos SET ${serValores} WHERE turno_id = ?`;

        const [resultado] = await conexion.execute(sql,parametros);

        if (resultado.affectedRows === 0){
            return null;
        }
        return this.buscarPorId(turno_id);
    }



    eliminar = async (turno_id) =>{
            const sql = 'UPDATE turnos SET activo = 0 WHERE turno_id = ? AND activo = 1';
            const [resultado] = await conexion.execute(sql, [turno_id]);
            return resultado;
        };
}