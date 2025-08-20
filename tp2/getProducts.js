import fetch from "node-fetch";

// URL de la API
const url = "https://fakestoreapi.com/products";

async function getProducts() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al recuperar productos: ${response.status}`);
    }

    const products = await response.json();

    console.log("Lista de productos:");
    console.log(products);
  } catch (error) {
    console.error("Ocurrió un error:", error.message);
  }
}

getProducts();