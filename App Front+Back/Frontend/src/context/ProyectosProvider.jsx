import {createContext, useEffect, useState} from 'react'
import clienteAxios from '../config/clienteAxios'
import {useNavigate} from 'react-router-dom'

const ProyectosContext = createContext()


const ProyectosProvider = ({children}) => {

  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [proyecto, setProyecto] = useState({})
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate()

  const mostrarAlerta = alerta=>{
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 5000);
  }

  useEffect(() => {
    const ObtenerProyectos= async()=>{
      try {
        const token = localStorage.getItem('token')
        if(!token) return
  
        const config = {
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
        const {data} = await clienteAxios('/proyectos',config)
        setProyectos(data)
      } catch (error) {
        console.log(error);
      }
    }
    ObtenerProyectos()
  }, [])

  const obtenerProyecto= async(id)=>{
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const {data} = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)

    } catch (error) {
      console.log(error);
    }finally{
      setCargando(false)
    }
  }

  const submitProyecto = async proyecto=>{
    if(proyecto.id){
      await editarProyecto(proyecto)
    } else {
      await nuevoProyecto(proyecto)
    }
    
  }

  const editarProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      const {data} = clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
      const proyectosActualizados = proyectos.map(proyectoState=>proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)
      setAlerta({
        msg:'Proyecto Actualizado Correctamente',
        error:false
      })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  } 

  const nuevoProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.post('/proyectos',proyecto,config)
      setProyectos([...proyectos,data])
      setAlerta({
        msg:'Proyecto Creado Correctamente',
        error:false
      })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProyectosContext.Provider value={{
      proyectos,
      mostrarAlerta,
      alerta,
      submitProyecto,
      obtenerProyecto,
      proyecto,
      cargando
    }}>
        {children}
    </ProyectosContext.Provider>
  )
}

export {ProyectosProvider}

export default ProyectosContext