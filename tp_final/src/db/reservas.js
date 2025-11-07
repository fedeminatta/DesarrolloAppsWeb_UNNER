import { conexion } from "./conexion.js";

export default class Reservas{

    buscarTodos = async() => {
        const sql = 'SELECT * FROM reservas WHERE activo =1'
        const [reservas] = await conexion.execute(sql);
        return reservas
    };

    buscarPorId = async(reserva_id,datosReserva) =>{
        const sql = 'SELECT * FROM reservas WHERE reserva_id = ? and activo = 1';
        const [reserva] = await conexion.execute(sql,[reserva_id]);

        if(reserva.length === 0){
            return null;
        }
        return reserva[0];
    };

    agregar = async (datosReserva) =>{

    };

    editar = async(reserva_id,datosReserva) =>{

    };

    eliminar = async(reserva_id) =>{
        const sql = 'UPDATE reservas SET activo = 0 WHERE reserva_id = ? AND activo = 1';
        const[resultado] = await conexion.execute(sql,[reserva_id]);
        return resultado;
    };

}