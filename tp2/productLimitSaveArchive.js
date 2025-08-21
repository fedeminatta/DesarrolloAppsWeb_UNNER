const fs = require('fs');
const urlApi = 'https://fakestoreapi.com/products';

async function getProdcutsLimitados(limite){
    try{
        const response = await fetch(`${urlApi}?limit=${limite}`);
        if(!response.ok){
            throw new Errror(`Error: ${response.status}`);
        }
        const productos = await response.json();
        console.log(prodcutos);
        return productos;
    } catch(error){
        console.log('Error al traer una cantidad especifica de productos:',error)
        return null;
    }
}

function guardarArchivoLocal(nombreArchivo, datos){
    fs.writeFile(nombreArchivo, JSON.stringify(datos, null, 2),(err)=>{
        if(err){
            console.log('Error al guardar el archivo:', err);
        } else{
            console.log(`Archivo guardado exitosamente como:,${nombreArchivo}`);
        }
    });
}

async function procesoDeGuardado(){
    const productos = await getProductsLimitados(4);
    if(productos){
        guardarArchivoLocal('productosSelecionados.json', productos);
    }
}

procesoDeGuardado();