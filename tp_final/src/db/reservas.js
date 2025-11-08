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

    agregar = async (reserva) =>{

        const sql = 'INSERT INTO reservas(fecha_reserva,salon_id,usuario_id,turno_id,foto_cumpleaniero ,tematica,importe_salon,importe_total) VALUES(?,?,?,?,?,?,?,?)';
        const valores = [
            reserva.fecha_reserva,
            reserva.salon_id,
            reserva.usuario_id,
            reserva.turno_id,
            reserva.foto_cumpleaniero ?? null,
            reserva.tematica ?? null,
            reserva.importe_salon ?? null,
            reserva.importe_total ?? null
  ];
        
        
        const[resultado] = await conexion.execute(sql,valores)
        
        if(resultado.affectedRows === 0){
            return null
        };

        return this.buscarPorId(resultado.insertId);
    };


    editar = async (reserva_id, datosReserva) => {
    
    const actualizarColumnas = [
        'fecha_reserva',
        'salon_id',
        'usuario_id',
        'turno_id',
        'foto_cumpleaniero',
        'tematica',
        'importe_salon',
        'importe_total'
    ];

    const camposAActualizar = Object.keys(datosReserva).filter(campo =>
        actualizarColumnas.includes(campo)
    );

    if (camposAActualizar.length === 0) {
        throw new Error("No hay campos válidos para actualizar");
    }

    const valoresAActualizar = camposAActualizar.map(campo =>
        datosReserva[campo] ?? null
    );

    const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
    const parametros = [...valoresAActualizar, reserva_id];

    const sql = `UPDATE reservas SET ${setValores} WHERE reserva_id = ? AND activo = 1`;

    const [resultado] = await conexion.execute(sql, parametros);

    if (resultado.affectedRows === 0) {
        return null;
    }

    return this.buscarPorId(reserva_id);
};

    eliminar = async(reserva_id) =>{
        const sql = 'UPDATE reservas SET activo = 0 WHERE reserva_id = ? AND activo = 1';
        const[resultado] = await conexion.execute(sql,[reserva_id]);
        return resultado;
    };


    datosParaNotificacion = async(reserva_id) =>{
        
        const sql = 'SELECT r.fecha_reserva as fecha, s.titulo as salon, t.orden as turno FROM reservas as r INNER JOIN salones as s on s.salon_id = r.salon_id INNER JOIN turnos as t on t.turno_id = r.turno_id WHERE r.activo = 1 and r.reserva_id = ?';

        const[reserva] = await conexion.execute(sql,[reserva_id]);
        if(reserva.length === 0){
            return null;
        }
        return reserva[0];
    }

}