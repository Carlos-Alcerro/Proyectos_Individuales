import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Alerta2 from '../components/Alerta2'

const NuevoPassword = () => {
  const [tokenValid, setTokenValid] = useState(false)
  const [alerta, setAlerta] = useState('')
  const [password, setPassword] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token} = params
  useEffect(() => {
    const comprobarToken = async ()=>{
      try {
        await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
        setTokenValid(true)
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e =>{
    e.preventDefault()

    if(password.length<6){
      setAlerta({
        msg:'El password debe ser minimo de 6 caracteres',
        error:true
      })
      return
    }
    try {
      const url = `http://localhost:4000/api/usuarios/olvide-password/${token}`
      const {data} = await axios.post(url,{password})
      setAlerta({
        msg:data.msg,
        error:false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg:error.data.response.msg,
        error:true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
         <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu Passwor y no pierdas <span className="text-slate-700">Tus Proyectos</span></h1>
  
         {msg && <Alerta2 alerta={alerta}/>}

{tokenValid &&(
  <form onSubmit={handleSubmit} className="my-20 bg-white p-10 shadow rounded-lg">
  <div className="my-5">
      <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="nuevo-password">Nuevo Password</label>
      <input type='password' placeholder='Escribe tu nuevo password' className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="nuevo-password" value={password} onChange={e=>setPassword(e.target.value)}/>
  </div>
  <input type="submit" value="Guardar Nuevo Password" className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
</form>
)}
 {passwordModificado && (
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/'>Inicia Sesion</Link>
          )}
    </>
  )
}

export default NuevoPassword