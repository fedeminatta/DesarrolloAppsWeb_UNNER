import {promises as fs} from 'fs';

async function addProduct() {
    
    try{
        const datos = await fs.readFile('./productosSeleccionados.json', 'utf-8');
        const datosleidos = JSON.parse(datos);
        datosleidos.push(prod);
        console.log(datosleidos);

        const datostxt = JSON.stringify(datosleidos, null, 2);
        fs.writeFile('./productosSeleccionados.json', datostxt);
    }catch(error){
        console.error(error);
    }
}


const prod = {
    id: 5,
    title: 'Perfume con olor a flores.',
    price: 26.2,
    description: 'Huele a flores.',
    category: "Perfumes",
    image: 'ImagenGenericaDePerfume',
    rating: { rate: 2.3, count: 115 }
}

addProduct(prod)