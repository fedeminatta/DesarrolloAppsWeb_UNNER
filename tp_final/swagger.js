import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = [
	'./reservas.js',
	'./v1/rutas/reportesRutas.js',
	'./rutas/authRutas.js',
	'./rutas/reservasRutas.js',
	'./rutas/salonesRutas.js',
	'./rutas/serviciosRutas.js',
	'./rutas/turnosRutas.js',
	'./rutas/usuariosRutas.js',
];

const doc = {
	info: {
		title: 'API de reservas de cumpleaños',
		description:
			'Esta api permite gestionar la creación de salones, servicios y reservas.',
	},
	host: 'localhost:3000',
	schemes: ['http'],
};

swaggerAutogen()(outputFile, endPointsFiles, doc);
