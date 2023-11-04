import React,{useState,useEffect} from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'


function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPres, setIsValidPres] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoeditar, setGastoeditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if(Object.keys(gastoeditar).length > 0){
      setModal(true)
  
      setTimeout(() => {
       setAnimarModal(true)
      }, 500);
    }
  }, [gastoeditar])

  const handleNuevoGasto=()=>{
    setModal(true)
    setGastoeditar({})

    setTimeout(() => {
     setAnimarModal(true)
    }, 500);
  }

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPres(true)
    }
  }, [])

  useEffect(() => {
    //Filtro de Gastos Por Categoria
    const gastosFiltrados = gastos.filter(gasto=> gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }, [filtro])

  const guardarGasto = gasto =>{

    if(gasto.id){
      //Actualizar Gasto
      const gastosActualizados=gastos.map(gastoState=> gastoState.id===gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoeditar({})
    }else{
      //Nuevo Gasto
      gasto.id=generarId();
    gasto.fecha=Date.now()
    setGastos([...gastos,gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 500);
}

const eliminarGasto= id =>{
  const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

  setGastos(gastosActualizados)
}


  return (
   <div className={modal ? 'fijar' : ''}>
    <Header
    setGastos={setGastos}
    gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPres={isValidPres}
      setIsValidPres={setIsValidPres}
    />

    {isValidPres && (
      <>
      <main> 
        <Filtros filtro={filtro} setFiltro={setFiltro}/>
         <ListadoGastos gastos={gastos} setGastoeditar={setGastoeditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro}/>
      </main>
      <div className='nuevo-gasto'>
      <img src={IconNuevoGasto} alt="Icono Nuevo Gasto" onClick={handleNuevoGasto}/>
   </div>
      </>
    )}
    {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoeditar={gastoeditar} setGastoeditar={setGastoeditar}/>}
   </div>
  )
}

export default App
