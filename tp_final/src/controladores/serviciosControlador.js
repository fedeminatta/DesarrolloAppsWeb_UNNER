import ServiciosServicio from '../servicios/serviciosServicio.js';


export default class ServiciosControlador{
    constructor(){
        this.serviciosServicio = new ServiciosServicio()
    };
    buscarTodos = async(req,res) =>{
        try{

            const servicios = await this.serviciosServicio.buscarTodos();

        res.json({
            estado:true,
            datos: servicios
        });

        }catch(err){

            console.log('Error en GET /servicios', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });

        }
    };

    buscarPorId = async(req,res) =>{
        try{

            const servicio_id = req.params.servicio_id;
            const servicio = await this.serviciosServicio.buscarPorId(servicio_id);

            if(servicio){
                res.json({
                    estado: true, 
                    datos: servicio
                });
            }else{
                res.status(404).json({ 
                    estado: false, 
                    mensaje: 'Servicio no encontrado'
                });
            }

        }catch(err){
        console.log('Error en GET /servicios/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        });
    }
    };

    agregar = async(req,res) =>{
        try{

        const datosServicio = req.body;
        const resultado = await this.serviciosServicio.agregar(datosServicio);
        
        if(!resultado){
            return res.status(404).json({
                estado:false,
                mensaje:'Servicio no creado.'
            });
        };

        res.status(201).json({
            estado: true,
            mensaje: 'Servicio agregado correctamente',
            servicio: resultado
        });

        }catch(err){
            console.log('Error en POST /servicios', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    };

    editar = async(req,res) =>{
        try{

        const { id } = req.params;
        const datosServicios = req.body;


        const resultado = await this.serviciosServicio.editar(id, datosServicios);
        
        if(resultado.affectedRows === 0 ){
            res.status(404).json({
                estado: false,
                mensaje: 'El servicio no se pudo modificar.'
            });
        }else{
            res.json({
                estado: true,
                mensaje: 'Servicio modificado correctamente',
                servicio: resultado
            });
        }

        }catch(err){

            console.log('Error en PUT /servicios/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        };
    };
    
    eliminar = async(req,res) =>{

        try {
            const { id } = req.params;
            const resultado = await this.serviciosServicio.eliminar(id);
            if (resultado.affectedRows > 0) {
                res.json({
                    estado: true,
                    mensaje: 'Servicio eliminado exitosamente'
                });
            }else{
                res.status(404).json({
                    estado: false,
                    mensaje: 'No se encontró el servicio'
                });
            }
        }catch (err){
            console.log('Error en DELETE /servicios/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        };
    };
}