import mongoose from 'mongoose'

const proyectosSchema = mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    fechaEntrega:{
        type:Date,
        default:Date.now()
    },
    cliente:{
        type:String,
        trim:true,
        required:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        //ref es de donde obtiene la referencia
        ref:'Usuario'
    },
    //Los corchetes indican que pueden haber mas de un colaborador
    colaboradores:[
        {
            type:mongoose.Schema.Types.ObjectId,
            //ref es de donde obtiene la referencia
            ref:'Usuario'  
        },
    ],
}, {
    timestamps:true     
    }
);

const Proyecto = mongoose.model('Proyectos',proyectosSchema)

export default Proyecto;