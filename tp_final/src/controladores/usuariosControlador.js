import UsuariosServicios from '../servicios/usuariosServicios.js';

export default class UsuariosControlador {
    constructor(){
        this.usuariosServicios = new UsuariosServicios();
    }

    buscarTodos = async (req, res) => {
        try{
            const usuarios = await this.usuariosServicios.buscarTodos();
            res.json({
                estado: true,
                datos: usuarios
            });
        } catch (err) {
            console.log('Error en GET/usuarios', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
        }
    }

    buscarPorId = async (req, res) => {
        try{
            const id= req.params.id;
            const usuario = await this.usuariosServicios.buscarPorId(id);
            if(usuario) {
                res.json({
                    estado: true,
                    datos: usuario
                });
            }else {
                res.status(404).json({
                    estado: false,
                    mensaje: "No se encontro el usuario"
                });
            } 
        } catch (err) {
            console.log('Error en  GET/usuarios/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
        }
    }

    agregar = async (req, res) => {
        try{
            const datosUsario = req.body;
            const resultado = await this.usuariosServicios.agregar(datosUsario);
            res.status(201).json({
                estado: true,
                mensaje: "Usuario agregado correctamente",
                id: resultado.insertId
            });
        }catch (err) {
            console.log('Error en POST/usuarios', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
        }
    }

    editar = async (req, res) => {
        try{
            const id = req.params.id;
            const datosUsuario = req.body;
            const resultado = await this.usuariosServicios.editar(id, datosUsuario);

            if(resultado){
                res.json({
                    estado: true,
                    mensaje: "Usuario editado correctamente"
                });
            }else {
                res.status(404).json({
                    estado: false,
                    mensaje: "No se encontro el usuario"
                });
            }
        }catch (err) {
            console.log('Error en PUT/usuarios/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            })
        }
    }

    eliminar = async (req, res)=>{
        try{
            const id= req.params.id;
            const resultado = await this.usuariosServicios.eliminar(id);

            if(resultado){
                res.json({
                    estado: true,
                    mensaje: "Usuario eliminado correctamente"
                });
            }else {
                res.status(404).json({
                    estado: false,
                    mensaje: "No se encontro el usuario"
                });
            }
        }catch (err){
            console.log('Error en DELETE/usuarios/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
        }
    }
    
} 