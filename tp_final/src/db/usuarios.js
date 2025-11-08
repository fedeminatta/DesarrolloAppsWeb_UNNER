import { conexion } from "./conexion.js";

export default class Usuarios {
    buscar= async (nombre_usuario, contrasenia) => {
        const sql = `SELECT u.usuario_id, CONCAT(u.nombre, '' ,u.apellido) as usuario, u.tipo_usuario
        FROM usuarios AS u
        WHERE u.nombre_usuario = ? AND u.contrasenia =SHA2(?, 256) AND u.activo =1;`
        const [result] =await conexion.query(sql, [nombre_usuario, contrasenia]);
        return result[0] //Devuelve el usuario o undefined
    }

    buscarPorId = async (usuario_id) => {
        const sql = `SELECT usuario_id, CONCAT(nombre, '', apellido) AS usuario, tipo_usuario
        FROM usuarios WHERE usuario_id = ? AND activo = 1;`
        const [result] = await conexion.query (sql, [usuario_id]);
        return result[0] 
    }

    //BREAD para admins//
    
    buscarTodos = async()=>{
        const sql = `SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular FROM usuarios WHERE activo = 1;`
        const [usuarios] = await conexion.execute(sql);
        return usuarios;
    }

    agregar = async (datosUsuario) =>{
        const sql = `INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, activo)
                    VALUES (?, ?, ?, SHA2(?, 256), ?, ?,1)`;
        const valores = [
            datosUsuario.nombre,
            datosUsuario.apellido,
            datosUsuario.nombre_usuario,
            datosUsuario.contrasenia,
            datosUsuario.tipo_usuario,
            datosUsuario.celular
        ];
        const [resultado] =await conexion.execute(sql, valores);
        return resultado;
    }

    editar = async (id, datosUsuario) =>{
        const sql = `UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, tipo_usuario = ?, celular = ?
                    WHERE usuario_id = ? AND activo = 1`;
        const valores = [
            datosUsuario.nombre,
            datosUsuario.apellido,
            datosUsuario.nombre_usuario,
            datosUsuario.tipo_usuario,
            datosUsuario.celular,
            id
        ];
        const [resultado] = await conexion.execute(sql, valores);
        return resultado;
    }

    eliminar = async (id) =>{
        const sql = `UPDATE usuarios SET activo = 0 WHERE usuario_id = ? AND activo =1`;
        const [resultado] = await conexion.execute(sql, id);
        return resultado;
    }
}