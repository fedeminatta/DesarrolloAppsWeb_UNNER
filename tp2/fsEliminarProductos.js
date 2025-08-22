import { promises as fs } from "fs";

const precioLimite = 25.00

const EliminarProductosPorPrecio = async()=>{
    try{
        // Leer archivo
        const datos = await fs.readFile('./productosSelecionados.json', 'utf-8');
        let productos = JSON.parse(datos);
        console.log('\n ---- Lista original ----')
        console.log(productos);
        // Filtrar productos por precio
        let filtrarPorPrecio = productos.filter(producto => producto.price <= precioLimite);
        console.log ('\n ---- Lista de productos modificada ----');
        console.log(filtrarPorPrecio);

    } catch(error){
        console.error(error);
    }
}

EliminarProductosPorPrecio()