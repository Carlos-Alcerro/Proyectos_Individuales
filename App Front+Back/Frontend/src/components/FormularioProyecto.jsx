import {useState,useEffect} from 'react'
import useProyectos from '../hooks/useProyectos'
import {useParams} from 'react-router-dom'   
import Alerta from './Alerta'


const FormularioProyecto = () => {

    const [id, setId] = useState()
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')  
    
    const params = useParams()
    console.log(params);
    const {mostrarAlerta,alerta,submitProyecto,proyecto} = useProyectos();

    useEffect(() => {
      if(params.id){
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        setCliente(proyecto.cliente)
      }
    }, [params])

    const handleSubmit = async e =>{
      e.preventDefault();

      if([nombre,descripcion,fechaEntrega,cliente].includes('')){
        mostrarAlerta({
          msg:'Todos los Campos son Requeridos',
          error:true
        })
        return
      }

      //Pasar los Datos al Provider
      await submitProyecto({id,nombre,descripcion,fechaEntrega,cliente})

      setId(null)
      setNombre('')
      setDescripcion('')
      setFechaEntrega('')
      setCliente('')

    }

    const {msg} = alerta;

  return (
  
    <form className='bg-white py-10 px-5 shadow md:w-1/2 lg:h-2/3 rounded-lg' onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta}/>}
      
        <div className='mb-5'>
            <label className='text-gray-700 font-bold uppercase text-sm' htmlFor='nombre' >Nombre Proyecto</label>
            <input id='nombre' type='text' className='p-2 border bg-gray-50 w-full rounded-md mt-2 placeholder-gray-400' placeholder='Nombre de Proyecto' value={nombre} onChange={e=> setNombre(e.target.value)} />
        </div>
        <div className='mb-5'>
            <label className='text-gray-700 font-bold uppercase text-sm' htmlFor='descripcion' >Descripcion de Proyecto</label>
            <textarea id='descripcion'  className='p-2 border bg-gray-50 w-full rounded-md mt-2 placeholder-gray-400' placeholder='Descripcion de Proyecto' value={descripcion} onChange={e=> setDescripcion(e.target.value)} />
        </div>
        <div className='mb-5'>
            <label className='text-gray-700 font-bold uppercase text-sm' htmlFor='fecha' >Fecha de Entrega</label>
            <input id='fecha' type='date' className='p-2 border bg-gray-50 w-full rounded-md mt-2 placeholder-gray-400' value={fechaEntrega} onChange={e=> setFechaEntrega(e.target.value)} />
        </div>
        <div className='mb-5'>
            <label className='text-gray-700 font-bold uppercase text-sm' htmlFor='cliente' >Nombre Cliente</label>
            <input id='cliente' type='text' className='p-2 border bg-gray-50 w-full rounded-md mt-2 placeholder-gray-400' placeholder='Nombre de Cliente' value={cliente} onChange={e=> setCliente(e.target.value)} />
        </div>

        <input type="submit" className='p-3 text-white uppercase rounded-md shadow bg-sky-600 font-bold w-full hover:bg-sky-700 cursor-pointer transition-colors' value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}/>
    </form>
  )
}

export default FormularioProyecto
