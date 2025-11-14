import Salones from '../db/salones.js';

export default class SalonesServicio{
    constructor() {
            this.salones = new Salones();
        }
    buscarTodos = () =>{
        return this.salones.buscarTodos();
    };

    buscarPorId = (salon_id) =>{
		return this.salones.buscarPorId(salon_id);
	};



    agregar = async (datosSalon) => {

        const {titulo} = datosSalon;

        const existe = await this.salones.existeTitulo(titulo);
        if(existe){
            return {estado: false};
        };

		const resultado = await this.salones.agregar(datosSalon);
        return resultado
	};

	editar = async (salon_id,datosSalon) =>{
        //verificar si existe
        const existe = await this.salones.buscarPorId(salon_id);
        const {titulo} = datosSalon;

        const existeTitulo = await this.salones.existeTitulo(titulo);
        if(existeTitulo){
            return {estado: false};
        };

        
        if(!existe){
            return null;
        };
        return this.salones.editar(salon_id,datosSalon);
    };

    eliminar = (salon_id) => {
        //verificar que exista
        const existe = this.salones.buscarPorId(salon_id);

        if(!existe){
            return null;
        };
        
		return this.salones.eliminar(salon_id);
	};
}