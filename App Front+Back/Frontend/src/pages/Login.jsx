import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setAuth} = useAuth()

    const handleSubmit = async e =>{
        e.preventDefault() 
        
        if([email,password].includes('')){
            setAlerta({
                msg:'Los campos son Obligatorios',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 5000);
            return
        }

        try {
            const {data} = await clienteAxios.post('/usuarios/login',{email,password})
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
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

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Iniciar Sesion y Administra tus <span className="text-slate-700">Proyectos</span></h1>
        {msg && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit} className="my-20 bg-white p-10 shadow rounded-lg">
            <div className="my-5">
                <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="email">Email</label>
                <input type='email' placeholder='Escribe tu email' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
                <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="password">Password</label>
                <input type='password' placeholder='Escribe tu password' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>

            <input type="submit" value="Iniciar Sesion" className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
        </form>

        <nav className='lg:flex lg:justify-between '>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/registrar'>No tienes una Cuenta? Registrate</Link>
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='olvide-password'>Olvide mi Contrasena</Link>
        </nav>
    </>
  )
}

export default Login 