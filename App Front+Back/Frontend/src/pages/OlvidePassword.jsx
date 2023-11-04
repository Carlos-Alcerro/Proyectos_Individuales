import {Link} from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'


const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(email==='' || email.length <6){
            setAlerta({
                msg:"El email es Obligatorio",
                error:true
            })
            return
        }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,{email})
            setAlerta({
                msg:data.msg,
                error:false
            })
            setTimeout(() => {
                setAlerta({})
            }, 5000);
            setEmail('')
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 5000);
        }
    }

    const {msg} = alerta

    return(
        <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu <span className="text-slate-700">Cuenta</span></h1>
    {msg && <Alerta alerta={alerta}/>}
    <form onSubmit={handleSubmit} className="my-20 bg-white p-10 shadow rounded-lg">
    <div className="my-5">
        <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="email">Email</label>
        <input type='email' value={email}  onChange={e=>setEmail(e.target.value)} placeholder='Escribe tu email' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email"/>
    </div>

    <input type="submit" value="Enviar Email" className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
</form>

<nav className='lg:flex lg:justify-between '>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/'>Ya tienes una Cuenta? Inicia Sesion</Link>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/registrar'>No tienes una Cuenta? Registrate</Link>
        </nav>
  </>
    )
}

export default OlvidePassword