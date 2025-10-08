import Salones from '../db/salones.js';

export default class SalonesServicio {
	constructor() {
		this.salones = new Salones();
	}

	buscarTodos = () => {
		return this.salones.buscarTodos();
	};

	buscarSalonPorId = (id) =>{
		return this.salones.buscarSalonPorId(id);
	}

	agregar =(datosSalon) => {
		return this.salones.agregar(datosSalon);
	}
}
