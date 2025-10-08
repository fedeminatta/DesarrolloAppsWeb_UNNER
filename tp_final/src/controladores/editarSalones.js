export default async function editarSalon (req, res, salonesServicio) {
    try{
        const id = req.params.id;
        const datosSalon = req.body;
        const resultado = await salonesServicio.editar(id, datosSalon);
        if(resultado.affectedRows > 0 ){
            res.json({
                estado: true,
                mensaje: 'Salon editado correctamente'
            });
        }else{
            res.status(404).json({
                estado: false,
                mensaje: 'Salon no encontrado'
            });
        }
    }catch(err){
        console.log('Error en PUT /salones/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor'
        });
    }
}