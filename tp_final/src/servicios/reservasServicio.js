import Reservas from '../db/reservas.js';
import ReservasServicios from '../db/reservas_servicios.js';
import Notificacion from '../servicios/notificacionesServicios.js'

export default class ReservasServicio {
    constructor(){
        this.reserva = new Reservas;
        this.reservas_servicios = new ReservasServicios()
        this.notificacion = new Notificacion();
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
                tematica,
                importe_salon,
                importe_total}

            //solo creo la reserva
            const resultado = await this.reserva.agregar(nuevaReserva);

            if(!resultado) {
                return null;
            }
        
        //creo las relaciones reservas_-servicios
            const relacionOk = await this.reservas_servicios.agregar(resultado.reserva_id,servicios);
            console.log(relacionOk);

            if(!relacionOk){
                await this.reserva.eliminar(reserva.reserva_id);
                return null;
            }
        //busco y envío los datos de notificación
            const datosParaNotificacion = await this.reserva.datosParaNotificacion(resultado.reserva_id);

            console.log(datosParaNotificacion)

            await this.notificacion.enviarCorreo(datosParaNotificacion);
            return this.reserva.buscarPorId(resultado.reserva_id);
        
    }



    editar = (reserva_id,datosReserva) =>{
        
        const existe = this.reserva.buscarPorId(reserva_id);

        if(!existe){
            return null;
        };
        return this.reserva.editar(reserva_id,datosReserva);
    }



    eliminar = (reserva_id) => {

        const existe = this.reserva.buscarPorId(reserva_id);

        if(!existe){
            return null;
        };
        return this.reserva.eliminar(reserva_id);
    }
    }
    








