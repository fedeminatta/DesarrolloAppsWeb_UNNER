
const API_URL = "https://fakestoreapi.com/products";

async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error al eliminar: ${res.status}`);
    const data = await res.json();
    console.log(`Producto eliminado id=${id}:`, data);
    return data;
  } catch (err) {
    console.error("Error en deleteProduct:", err.message);
  }
}

async function updateProduct(id, newData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);
    const data = await res.json();
    console.log(`Producto actualizado id=${id}:`, data);
    return data;
  } catch (err) {
    console.error("Error en updateProduct:", err.message);
  }
}

// ====================
//   EJEMPLO DE PRUEBA
// ====================
(async () => {
  
  // Modificar producto (PUT)
  await updateProduct(1, {
    title: "Producto modificado",
    price: 200,
    description: "Actualizado vía PUT",
    image: "https://images.pexels.com/photos/33448109/pexels-photo-33448109.jpeg",
    category: "electronics",
  });

  // Eliminar producto (DELETE)
  await deleteProduct(2);

})();