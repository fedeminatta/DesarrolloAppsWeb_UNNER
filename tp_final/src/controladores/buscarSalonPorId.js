export default async function buscarSalonPorId(req, res, salonesServicio){
    try{
        const id = req.params.id;
        const salon = await salonesServicio.buscarSalonPorId(id);
        if(salon){
            res.json({
                estado: true, 
                datos: salon
            });
        }else{
            res.status(404).json({ 
                estado: false, 
                mensaje: 'Salon no encontrado'
            });
        }
    }catch(err){
        console.log('Erro en GET /salones/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        });
    }
}
