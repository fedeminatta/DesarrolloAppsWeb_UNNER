import TurnosServicio from '../servicios/turnosServicios.js';


export default class TurnosControlador{
    constructor(){
        this.turnosServicio = new TurnosServicio()
    };
    buscarTodos = async(req,res) =>{
        try{

            const turnos = await this.turnosServicio.buscarTodos();

        res.json({
            estado:true,
            datos: turnos
        });

        }catch(err){

            console.log('Error en GET /turnos', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });

        }
    };

    buscarPorId = async(req,res) =>{
        try{

            const turno_id = req.params.turno_id;
            const turno = await this.turnosServicio.buscarPorId(turno_id);

            if(turno){
                res.json({
                    estado: true, 
                    datos: turno
                });
            }else{
                res.status(404).json({ 
                    estado: false, 
                    mensaje: 'Turno no encontrado'
                });
            }

        }catch(err){
        console.log('Error en GET /turnos/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor.'
        });
    }
    };

    agregar = async(req,res) =>{
        try{

        const datosTurno = req.body;
        const resultado = await this.turnosServicio.agregar(datosTurno);
        
        if(!resultado){
            return res.status(404).json({
                estado:false,
                mensaje:'Turno no creado.'
            });
        };

        res.status(201).json({
            estado: true,
            mensaje: 'Turno agregado correctamente',
            id: resultado.insertId 
        });

        }catch(err){
            console.log('Error en POST /turnos', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    };

    editar = async(req,res) =>{
        try{

        const { id } = req.params;
        const datosTurno = req.body;


        const resultado = await this.turnosServicio.editar(id, datosTurno);
        
        if(resultado.affectedRows === 0 ){
            res.status(404).json({
                estado: false,
                mensaje: 'El turno no se pudo modificar.'
            });
        }else{
            res.json({
                estado: true,
                mensaje: 'Turno modificado correctamente'
            });
        }

        }catch(err){

            console.log('Error en PUT /turnos/:id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        };
    };
    
    eliminar = async(req,res) =>{

        try {
            const { id } = req.params;
            const resultado = await this.turnosServicio.eliminar(id);
            if (resultado.affectedRows > 0) {
                res.json({
                    estado: true,
                    mensaje: 'Turno eliminado exitosamente'
                });
            }else{
                res.status(404).json({
                    estado: false,
                    mensaje: 'No se encontró el turno'
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