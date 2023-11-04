import React,{useState,useEffect} from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoeditar,setGastoeditar}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoeditar).length > 0){
            setNombre(gastoeditar.nombre)
            setCantidad(gastoeditar.cantidad)
            setCategoria(gastoeditar.categoria)
            setId(gastoeditar.id)
            setFecha(gastoeditar.fecha)
           }
    }, [])

    const handleSubmit =(e)=>{
        e.preventDefault()

        if([nombre,cantidad,categoria].includes('')){
            setMensaje('Todos los campos son Obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 1000);
            return
        }
        guardarGasto({nombre,cantidad,categoria,id,fecha})
    }

    const cerrarModal =()=>{
        setAnimarModal(false)
        setGastoeditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} alt="Cerrar Modal" onClick={cerrarModal} />
        </div>
        <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
            <legend>
               {gastoeditar.nombre ? 'Editar Gasto' :'Nuevo Gasto'}
            </legend>
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input id='nombre' type="text" placeholder='Anade el nombe del Gasto' value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input id='cantidad' type="number" placeholder='Cantidad de Gasto' value={cantidad} onChange={(e)=>setCantidad(Number(e.target.value))}/>
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                
                <select id="categoria" value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
                    <option value="">--- Seleccione ---</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="subscripciones">Subscripciones</option>
                </select>
            </div>
            {gastoeditar.nombre ? <input type="submit" value='Editar gasto'/> : <input type="submit" value='anadir gasto'/>}
        </form>
    </div>
  )
}

export default Modal