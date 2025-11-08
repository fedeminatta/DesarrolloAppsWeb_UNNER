import Usuarios from "../db/usuarios.js";

export default class UsuariosServicios {
    constructor(){
        this.usuarios = new Usuarios();
    }

    buscar = async(nombre_usuario, contrasenia) => {
        return this.usuarios.buscar(nombre_usuario, contrasenia);
    };

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    };

    buscarTodos =() => {
        return this.usuarios.buscarTodos();
    };

    agregar = (datosUsuario) => {
        return this.usuarios.agregar(datosUsuario);
    };

    editar = async (id, datosUsuario) => {
        const existe = await this.usuarios.buscarPorId(id);
        if(!existe){
            return null;
        }
        return this.usuarios.editar(id, datosUsuario);
    };

    eliminar = async (id) => {
        const existe = await this.usuarios.buscarPorId(id);
        if(!existe){
            return null;
        }
        return this.usuarios.eliminar(id);
    };


}