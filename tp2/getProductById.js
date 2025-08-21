import fetch from 'node-fetch';

const url = 'https://fakestoreapi.com/products';

async function getProductById(id) {
	try {
		const response = await fetch(`${url}/${id}`);

		if (!response.ok) {
			throw new Error(`Error al obtener el producto: ${response.status}`);
		}

		const data = await response.json();
		console.log('Producto:', data);
	} catch (error) {
		console.error('Error:', error.message);
	}
}

getProductById(2);
