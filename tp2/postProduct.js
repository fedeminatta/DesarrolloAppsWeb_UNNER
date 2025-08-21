import fetch from 'node-fetch';

const url = 'https://fakestoreapi.com/products';

const producto = {
	title: 'Monitor',
	price: 130000,
};

async function postProduct(producto) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(producto),
		});

		if (!response.ok) {
			throw new Error(`Error al agregar el producto: ${response.status}`);
		}

		const data = await response.json();
		console.log('Producto agregado:', data);
	} catch (error) {
		console.error('Ocurrió un error:', error.message);
	}
}

postProduct(producto);
