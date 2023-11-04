import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tareas.js';

const agregarTarea= async (req,res)=>{
    const {proyecto} = req.body
    
    const tarea = await Proyecto.findById(proyecto);
    if(!existeProyecto){
        const error = new Error('No existe el Proyecto')
        return res.status(404).json({msg:error.message})
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos adecuados')
        return res.status(403).json({msg:error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error);
    }
}

const obtenerTarea= async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea){
        const error = new Error('No existe la tarea')
        return res.status(404).json({msg:error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no Valida')
        return res.status(403).json({msg:error.message})
    }
    res.json(tarea)
}

const actualizarTarea= async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea){
        const error = new Error('No existe la tarea')
        return res.status(404).json({msg:error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no Valida')
        return res.status(403).json({msg:error.message})
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error);
    }

}

const eliminarTarea= async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto')

    if(!tarea){
        const error = new Error('No existe la tarea')
        return res.status(404).json({msg:error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no Valida')
        return res.status(403).json({msg:error.message})
    }
    try {
        await tarea.deleteOne();
        res.json({msg:"La tarea ha sido Eliminada"})
    } catch (error) {
        console.log(error);
    }
}

const cambiarEstado= async (req,res)=>{
     
}

export {agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstado }