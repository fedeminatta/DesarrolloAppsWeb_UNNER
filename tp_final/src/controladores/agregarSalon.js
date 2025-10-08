export default async function agregarSalon (req, res, salonesServicio){
    try{
        const datosSalon = req.body;
        const resultado = await salonesServicio.agregar(datosSalon);
        res.status(201).json({
            estado: true,
            mensaje: 'Salon agregado correctamente',
            id: resultado.insertId 
        });
    }catch(err){
        console.log('Error en POST /salones', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}