import Salones from '../db/salones.js';

export default class SalonesServicio{
    constructor() {
            this.salones = new Salones();
        }
    buscarTodos = () =>{
        return this.salones.buscarTodos();
    };

    buscarSalonPorId = (salon_id) =>{
		return this.salones.buscarSalonPorId(salon_id);
	};

    agregar =(datosSalon) => {
		return this.salones.agregar(datosSalon);
	};

	editar = (salon_id,datosSalon) =>{
        //verificar si existe
        const existe = this.salones.buscarSalonPorId(salon_id);
        
        if(!existe){
            return null;
        };
        return this.salones.editar(salon_id,datosSalon);
    };

    eliminar = (salon_id) => {
        //verificar que exista
        const existe = this.salones.buscarSalonPorId(salon_id);

        if(!existe){
            return null;
        };
        
		return this.salones.eliminar(salon_id);
	};
}