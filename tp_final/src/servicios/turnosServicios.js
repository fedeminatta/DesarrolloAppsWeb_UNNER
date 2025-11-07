import Turnos from '../db/turnos.js';

export default class TurnosServicio{
    constructor(){
        this.turnos = new Turnos();

    };

    buscarTodos = () =>{
        return this.turnos.buscarTodos();
    };

    buscarPorId = (turno_id) =>{
        return this.turnos.buscarPorId(turno_id);
    };

    agregar =(datosTurnos) => {
        return this.turnos.agregar(datosTurnos);
    };

    editar = (turno_id, datosTurnos) =>{
        //verificar si existe
        const existe = this.turnos.buscarPorId(turno_id);
        
        if(!existe){
            return null;
        };
        return this.turnos.editar(turno_id,datosTurnos);
    };

    eliminar = (turno_id) => {
        //verificar que exista
        const existe = this.turnos.buscarPorId(turno_id);

        if(!existe){
            return null;
        };
        
        return this.turnos.eliminar(turno_id);
    };
}