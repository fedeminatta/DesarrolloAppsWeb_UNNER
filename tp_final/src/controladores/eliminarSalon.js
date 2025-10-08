export default async function eliminarSalon(req, res, SalonesServicio){
    try {
        const id= req.params.id;
        const resultado = await SalonesServicio.eliminar(id);
        if (resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: 'Salon eliminado exitosamente'
            });
        }else{
            res.status(404).json({
                estado: false,
                mensaje: 'No se encontro el salon'
            });
        }
    }catch (err){
        console.log('Error en DELETE /salones/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor'
        });
    }
}