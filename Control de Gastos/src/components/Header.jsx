import React from 'react'
import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto,setPresupuesto,isValidPres,setIsValidPres,gastos,setGastos}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {isValidPres ? (
          <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setGastos={setGastos} setPresupuesto={setPresupuesto} setIsValidPres={setIsValidPres}/>
        ):(
          <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPres={setIsValidPres}
        />
        )
        }
    </header>
  )
}

export default Header
