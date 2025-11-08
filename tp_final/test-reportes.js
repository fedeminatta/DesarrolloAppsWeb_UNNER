// test-reportes.js
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api/reportes';

// Función genérica para probar rutas
const probarEndpoint = async (ruta) => {
	try {
		const res = await fetch(`${BASE_URL}${ruta}`);
		const contentType = res.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			const data = await res.json();
			console.log(`✔ ${ruta}`, data);
		} else {
			console.log(`✔ ${ruta}`, 'Archivo descargado o respuesta no JSON.');
		}
	} catch (error) {
		console.error(`❌ Error en ${ruta}:`, error.message);
	}
};

(async () => {
	console.log('🧪 Iniciando pruebas de reportes...\n');

	// Estadísticas JSON
	await probarEndpoint('/estadisticas/salones');
	await probarEndpoint('/estadisticas/ingresos');
	await probarEndpoint('/estadisticas/servicios');

	// Exportaciones CSV y PDF
	await probarEndpoint('/exportar/salones/csv');
	await probarEndpoint('/exportar/salones/pdf');

	// Envío de reporte por correo (funcionalidad extra)
	console.log('\n📧 Probando envío de correo...');
	await probarEndpoint('/enviar/salones/pdf?to=diegocor4@gmail.com');

	console.log('\n✅ Pruebas finalizadas.');
})();
