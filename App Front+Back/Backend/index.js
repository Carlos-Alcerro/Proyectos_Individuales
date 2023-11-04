import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarBD from './config/db.js';
import routerUsuario from './routes/usuarioRoute.js';
import proyectoRoute from './routes/proyectoRoute.js';
import tareaRoute from './routes/tareaRoute.js';

const app = express();
app.use(express.json())

dotenv.config();
conectarBD();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions ={
    origin: function(origin,callback){
        if(whitelist.includes(origin)){
            //Puede Consultar la API
            callback(null,true)
        }else{
            //No esta Permitido
            callback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/usuarios', routerUsuario)
app.use('/api/proyectos', proyectoRoute)
app.use('/api/tareas', tareaRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el Puerto ${PORT}`);
})