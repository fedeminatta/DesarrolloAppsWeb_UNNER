import Servicios from '../db/servicios.js';

export default class Serviciosservicio{
    constructor(){
        this.servicios = new Servicios();

    };

    buscarTodos = () =>{
        return this.servicios.buscarTodos();
    };

    buscarPorId = (servicio_id) =>{
		return this.servicios.buscarPorId(servicio_id);
	};

    agregar =(datosServicios) => {
		return this.servicios.agregar(datosServicios);
	};

    editar = (servicio_id,datosServicios) =>{
        //verificar si existe
        const existe = this.servicios.buscarPorId(servicio_id);
        
        if(!existe){
            return null;
        };
        return this.servicios.editar(servicio_id,datosServicios);
    };

    eliminar = (servicio_id) => {
        //verificar que exista
        const existe = this.servicios.buscarPorId(servicio_id);

        if(!existe){
            return null;
        };
        
		return this.servicios.eliminar(servicio_id);
	};
}