import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos"


const Proyectos = () => {

  const {proyectos} = useProyectos();

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      <div className="bg-white shadow rounded-md p-5 mt-10">
        {proyectos.length  ? proyectos.map(proyecto=>(
          <PreviewProyecto proyecto={proyecto} key={proyecto._id}/>
        ))
        :<p className="text-2xl text-center uppercase font-bold ">No hay Proyectos Aun</p>}
      </div>
    </>
  )
}

export default Proyectos