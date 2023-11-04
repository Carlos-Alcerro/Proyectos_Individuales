import {Link} from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';


const Registrar = () => {

 const [nombre, setNombre] = useState('');
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [password2, setPassword2] = useState('')
 const [alerta, setAlerta] = useState('')

 const handleSubmit= async (e)=>{
    e.preventDefault();
    if([nombre,email,password,password2].includes('')){
        setAlerta(
            {msg:'Todos los Campos son Obligatoios',
            error:true    
        }
    )
    return
    }
    if(password !==  password2){
        setAlerta(
            {msg:'Las contrasenas no Coinciden',
            error:true    
        }
    )
    }
    if(password.length <6){
        setAlerta(
            {msg:'El password es muy corto, poco seguro',
            error:true    
        }
    )
    }
    setAlerta({})

    //crear el Usuario en la Api
    console.log();

    try {
        const {data}= await clienteAxios.post(`/usuarios`,{nombre,email,password})
        setAlerta({
            msg:data.msg,
            error:false
        })
        setNombre('')
        setEmail('')
        setPassword('')
        setPassword2('')
    } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error:true
        })
    }
 }  

 const {msg }= alerta

  return (
    <>
         <h1 className="text-sky-600 font-black text-6xl capitalize">Registrate en nuestro Sitio <span className="text-slate-700">Neptuno Ventas</span></h1>
{msg && <Alerta alerta={alerta}/>}
<form onSubmit={handleSubmit} className="my-20 bg-white p-10 shadow rounded-lg">
<div className="my-5">
        <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="nombre">Nombre</label>
        <input onChange={e => setNombre(e.target.value)} value={nombre} type='text' placeholder='Escribe tu Nombre' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="nombre"/>
    </div>
    <div className="my-5">
        <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="email">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Escribe tu email' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email"/>
    </div>
    <div className="my-5">
        <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="password">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Escribe tu password' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password"/>
    </div>

    <div className="my-5">
        <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
        <input value={password2} onChange={e => setPassword2(e.target.value)} type='password' placeholder='Repite tu password' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password2"/>
    </div>

    <input type="submit" value="Crear Cuenta" className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
</form>

<nav className='lg:flex lg:justify-between '>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/'>Ya tienes una Cuenta? Inicia Sesion</Link>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/olvide-password'>Olvide mi Contrasena</Link>
        </nav>
    </>
  )
}

export default Registrar