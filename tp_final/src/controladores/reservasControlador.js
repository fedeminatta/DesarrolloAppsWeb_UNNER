import ReservasServicio from '../servicios//reservasServicio.js';

export default class ReservasServicio{
    constructor(){
        this.reservasServicio = new ReservasServicio();
    }

    buscarTodos = async (req,res) =>{
        try{

            const reservas = await this.reservasServicio.buscarTodos();

            res.json({
                estado: true,
                datos: reservas
            })

        }catch(err){

            console.log('Error en GET /reservas', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    };

    buscarPorId = async(req,res) =>{
        try{

            const reserva_id = req.params.reserva_id;
            const reserva = await this.reservasServicio.buscarPorId(reserva_id);

            if(reserva){

                res.json({
                    estado:true,
                    datos: reserva
                });
            } else{
                res.status(404).json({
                    estado:false,
                    mensaje:'Reserva no encontrada.'
                });
            }

        }catch(err){

            console.log('Error en GET /reservas_id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    }




    editar = async (req,res) =>{};



    agregar = async (req,res) =>{
        try{
        //información de reservas
            const{
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                fotoCumplianiero,
                tematica,
                importeSalon,
                importeTotal,
                servicios } = req.body;
        //creo el objeto reserva con esos datos
                const reserva = {
                    fecha_reserva,
                    salon_id,
                    usuario_id,
                    turno_id,
                    fotoCumplianiero,
                    tematica,
                    importeSalon,
                    importeTotal,
                    servicios
                };

            // creo nuevaReserva y le envía los datos de reserva creada anteriormente

                const nuevaReserva =  await this.reservasServicio.crear(reserva)

                if(!nuevaReserva){
                    return res.status(404).json({
                        estado: false,
                        mensaje: 'Reserva no creada.'
                    });
                }

                res.status(201).json({
                    estado:true,
                    mensaje:'Reserva creada exitosamente.',
                    salon: nuevaReserva
                });

        }catch(err){
             console.log('Error en POST /reservas', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        };
    }




    eliminar = async(req,res) =>{

        try{
            const{id} = req.params;

        const resultado = await this.reservasServicio.eliminar(id);

        if(resultado.affectedRows > 0){
            res.json({
                estado: true,
                mensaje: 'Reserva eliminada.'
            });
        }else{
             res.status(404).json({
                estado: false,
                mensaje: 'No se encontró una reserva.'
            });
        }
        } catch(err){
            console.log('Error en DELETE /reservas/:id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'Error interno del servidor'
        });
        } ;
    };
}