import useProyectos from "../hooks/useProyectos"
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import Spinner from "../components/Spinner"
import FormularioProyecto from "../components/FormularioProyecto"
Spinner

const EditarProyecto = () => {

    const params = useParams()
    const {obtenerProyecto,proyecto,cargando} = useProyectos()

    
    useEffect(() => {
      obtenerProyecto(params.id)
    }, [])

    const {nombre} = proyecto

console.log(proyecto);

  return (
    cargando ? <Spinner/> : (
        <>
            <h1 className='font-black text-4xl'>Editar Proyecto: {proyecto.nombre}</h1>
            <div className="mt-10 flex justify-center">
        <FormularioProyecto/>
      </div>
        </>
    )
  )
}

export default EditarProyecto