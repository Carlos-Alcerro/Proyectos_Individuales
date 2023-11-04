import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

  const params = useParams();
  const {id} = params;

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  useEffect(() => {
    const confirmarCuenta= async ()=>{
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const {data} = await axios(url)
        setAlerta({
          msg:data.msg,
          error:false
        })

        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta();
  }, [])

  const {msg} = alerta;

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y comienza <span className="text-slate-700">Tus Proyectos</span></h1>

        <div className='mt-20 md:mt-10 shadow-lg ps-5 py-10 rounded-xl bg-white'>
          {msg && <Alerta alerta={alerta}/>}
          {cuentaConfirmada && (
            <Link className='block text-center my-2 text-slate-500 uppercase text-sm' to='/'>Inicia Sesion</Link>
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta