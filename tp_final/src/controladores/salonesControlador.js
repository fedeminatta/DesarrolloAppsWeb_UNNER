import SalonesServicio from '../servicios/salonesServicios.js';


export default class SalonesControlador{
    constructor(){
        this.salonesServicio = new SalonesServicio()
    }

    buscarTodos = async (req,res) =>{
        try{

            const salones = await this.salonesServicio.buscarTodos();

            res.json({
                estado: true, 
                datos: salones
            });

        } catch(err){

            console.log('Error en GET /salones', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });

        }
    }
    
    buscarPorId = async(req,res) =>{
        try{

        const salon_id = req.params.salon_id;
        const salon = await this.salonesServicio.buscarPorId(salon_id);

        if(salon){
            res.json({
                estado: true, 
                datos: salon
            });
        }else{
            res.status(404).json({ 
                estado: false, 
                mensaje: 'Salón no encontrado'
            });
        }

        }catch(err){
        console.log('Error en GET /salones/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        });
    }
    };

    
    agregar = async(req,res) =>{
        try{

        const datosSalon = req.body;
        const resultado = await this.salonesServicio.agregar(datosSalon);
        if(!resultado){
            return res.status(404).json({
                estado:false,
                mensaje:'Salón no creado.'
            });
        };
        if(resultado.estado === false){
            return res.status(409).json({
                estado:false,
                mensaje: 'El salón ya existe'
            });
        };

        res.status(201).json({
            estado: true,
            mensaje: 'Salon creado correctamente',
            id: resultado.insertId
        });

        }catch(err){
            console.log('Error en POST /salones', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    };

    //ver que si se pone un campo que no exista devuelva el error y no cree el salon nuevo

    editar = async(req,res) =>{
        try{

        const { id } = req.params;
        const datosSalon = req.body;


        const resultado = await this.salonesServicio.editar(id, datosSalon);
        
        if(!resultado){
            res.status(404).json({
                estado: false,
                mensaje: 'El salón no existe.'
            });
        
        }else{
            res.json({
                estado: true,
                mensaje: 'Salon modificado correctamente',
                salon: resultado
            });
        }

        }catch(err){

            console.log('Error en PUT /salones/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        };
    };
    
    eliminar = async(req,res) =>{

        try {
            const { id } = req.params;

        const resultado = await this.salonesServicio.eliminar(id);
        if (resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: 'Salon eliminado exitosamente'
            });
        }else{
            res.status(404).json({
                estado: false,
                mensaje: 'No se encontró un salon'
            });
        }
    }catch (err){
        console.log('Error en DELETE /salones/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor'
        });
    };
    };

}