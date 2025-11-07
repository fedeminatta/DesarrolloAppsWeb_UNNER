import Reservas from '../db/reservas.js';
import ReservasServicios from '../db/reservas_servicios.js';

export default class ReservasServicio {
    constructor(){
        this.reserva = new Reservas;
        this.reservas_servicios = new ReservasServicios()
    }
    buscarTodos = () => {
        return this.reserva.buscarTodos();
    }

    buscarPorId = (reserva_id) =>{
        return this.reserva.buscarPorId(reserva_id);
    }



    agregar = async (reserva) => {
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_salon,
            importe_total,
            servicios} = reserva;

            const nuevaReserva = {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero,
                importe_salon,
                importe_total }

            //solo creo la reserva
            const resultado = await this.reserva.crear(nuevaReserva);

            if(!resultado) {
                return null;
            }
            return resultado;


            //creo las relaciones reservas servicios

            
    }



    editar = (reserva_id,datosReserva) =>{
        
        const existe = this.reservas_servicios.buscarPorId(reserva_id);

        if(!existe){
            return null;
        };
        return this.reservas_servicios.editar(reserva_id,datosReserva);
    }



    eliminar = (reserva_id) => {

        const existe = this.reservas_servicios.buscarPorId(reserva_id);

        if(!existe){
            return null;
        };
        return this.reservas_servicios.eliminar(reserva_id);
    }
    }
    