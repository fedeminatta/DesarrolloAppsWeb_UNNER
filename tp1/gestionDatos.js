// CONFIGURACIÓN INICIAL

let libros = [
    {   id:1,
        nombre: 'Cien años de soledad',
        precio: 8500,
        autor: 'Gabriel Garcia Márquez',
        stock: 0
    },
    {   id:2,
        nombre: '1984',
        precio: 10000,
        autor: 'George Orwell',
        stock: 2
    },
    {   id:3,
        nombre: 'El principito',
        precio: 9500,
        autor: 'Antonie de Saint-Exupéry',
        stock: 0
    },
    {   id:4,
        nombre: 'Rayuela',
        precio: 15000,
        autor: 'Julio cortázar',
        stock: 10
    },
    {   id:5,
        nombre: 'Don Quijote de la mancha',
        precio: 20000,
        autor: 'Miguel de Cervantes',
        stock: 1
    }
];

// OPERACIONES BÁSICAS Y ACCESO

console.log('\n ------ operaciones básicas y acceso ------');

console.log('cantidad de libros:',libros.length);

console.log (`Segundo elemento: ${libros[1].nombre}`);
console.log (`cuarto elemento: ${libros[3].nombre}`);

// RECORRIDO DEL ARRAY

console.log('\n ------ for..of ------');
// for.. of
for (let a of libros){
    console.log(a.nombre)
    console.log(a.precio)
};
console.log('\n ------ forEach ------');
//forEach
libros.forEach(function(libro){
    console.log(`Producto: ${libro.nombre}, Precio: ${libro.precio}`)
});

// MANIPULACIÓN DE ARRAYS

//agregar dos elementos al final PUSH()

console.log('\n ------ Array original ------');
console.log(libros); 

let contadorId = libros.length;

function nuevoLibro(nombre,precio,autor,stock){
    contadorId++;
    return {
        id: contadorId,
        nombre: nombre,
        precio: precio,
        autor: autor,
        stock: stock,
    }
};

libro1= nuevoLibro('Orgullo y prejuicio',8500,'Jane Austen', 1);
libro2 = nuevoLibro('La sombra del viento', 6000, 'Carlos Ruiz Zafón',15);

libros.push(libro1);
libros.push(libro2);

console.log('\n ------ Elementos agregados ------');
console.log(libros);

//Eliminar el último elemento
console.log('\n ------ Array original ------');
console.log(libros) ;

console.log('\n ------ ultimo elemento eliminado ------');

libros.pop();
console.log(libros);

// Agregar un nuevo elemento al inicio
console.log('\n ------ Array original ------');
console.log(libros);

console.log('\n ------ Elemento agregado al inicio ------'); 

libro3 = nuevoLibro('El alquimista',6000,'Paul Coelho',8);
libros.unshift(libro3);
console.log(libros);

// Eliminar el primer elemento 
console.log('\n ------ Array original ------');
console.log(libros)
console.log ('\n ------ Primer elemento eliminado ------');
libros.shift();
console.log(libros);

// nuevo array llamado productosConStock
let productosConStock = libros.filter(libro => libro.stock > 0);
console.log ('\n ------ Libros en stock ------');
console.log(productosConStock);

// nuevo  array  llamado  nombresProductos 
let nombresProductos =  libros.map(libro => libro.nombre)
console.log ('\n ------ Nombres de libros ------');
console.log(nombresProductos);

// Encontrar y guardar en una variable el primer producto en productos que tenga un id específico

let buscarId = 20;
let primerElemento = libros.find(libro => libro.id === buscarId);

console.log('\n------ Primer elemento ------')
if(primerElemento){
   console.log(primerElemento) 
}else{
    console.log('Elemento inexistente');
};

// nuevo array llamado  productosOrdenados  

let productosOrdenados = [...libros].sort((a,b) => b.precio - a.precio);
console.log('\n ------ Array original ------');
console.log(libros);

console.log('\n ------ Productos ordenados ------');
console.log(productosOrdenados)





