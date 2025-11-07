import { conexion } from "./conexion.js";

export default class Reservas{

    buscarTodos = async() => {
        const sql = 'SELECT * FROM reservas WHERE activo =1'
        const [reservas] = await conexion.execute(sql);
        return reservas
    };

    buscarPorId = async(reserva_id) =>{
        const sql = 'SELECT * FROM reservas WHERE reserva_id = ? and activo = 1';
        const [reserva] = await conexion.execute(sql,[reserva_id]);

        if(reserva.length === 0){
            return null;
        }
        return reserva[0];
    };

    agregar = async (datosReserva) =>{

        const sql = 'INSERT INTO reservas(fecha_reserva,salon_id,usuario_id,turno_id,foto_cumpleaniero,tematica,importe_salon,importe_total) VALUES(?,?,?,?,?,?,?,?)';
        const valores = [
            datosReserva.fecha_reserva,
            datosReserva.salon_i,
            datosReserva.usuario_id,
            datosReserva.turno_id,
            datosReserva.foto_cumpleaniero,
            datosReserva.tematica,
            datosReserva.importe_salon,
            datosReserva.importe_total
        ]
        
        const[resultado] = await conexion.execute(sql,valores)
        
        if(resultado.affectedtRows === 0){
            return null
        };

        return this.buscarPorId(resultado.insertId);
    };

//falta editar
    editar = async(reserva_id,datosReserva) =>{

    };

    eliminar = async(reserva_id) =>{
        const sql = 'UPDATE reservas SET activo = 0 WHERE reserva_id = ? AND activo = 1';
        const[resultado] = await conexion.execute(sql,[reserva_id]);
        return resultado;
    };


    datosParaNotificacion = async(reserva_id) =>{
        
        const sql = 'SELECT r.fecha_reserva as fecha, s.titulo as salon, t.orden as turno FROM reservas as r INNER JOIN salones as s on s.salon_id = r.salon_id INNER JOIN turno as t on t.turno_id = r.turno_id WHERE r.activo = 1 and r.reserva_id = ?';

        const[reserva] = await conexion.execute(sql,[reserva_id]);
        if(reserva.length === 0){
            return null;
        }
        return reserva[0];
    }

}