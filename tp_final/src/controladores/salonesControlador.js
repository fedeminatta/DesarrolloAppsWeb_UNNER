import SalonesServicio from "../servicios/salonesServicio.js";
import buscarTodosSalon from "./buscarTodosSalon.js"
import buscarSalonPorId from "./buscarSalonPorId.js";
import agregarSalon from "./agregarSalon.js";

export default class SalonesControlador{

    constructor(){
        this.salonesServicio = new SalonesServicio();
    }

    buscarTodos = (req, res) => buscarTodosSalon(req, res, this.salonesServicio);
    buscarPorId = (req, res) => buscarSalonPorId(req, res, this.salonesServicio);
    agregar = (req, res) => agregarSalon(req, res, this.salonesServicio);
}