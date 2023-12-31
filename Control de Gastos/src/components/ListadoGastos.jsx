import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos,setGastoeditar,eliminarGasto,filtro,gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
        {
        filtro ?(
        <>
         <h2>{gastosFiltrados.length ? 'Gastos' :'No hay gastos en esta Categoria'}</h2>
           {gastosFiltrados.map(gasto=>(
          <Gasto key={gasto.id} gasto={gasto} setGastoeditar={setGastoeditar} eliminarGasto={eliminarGasto}/>
        ))}
        </>
       ):(
        <>
        <h2>{gastos.length ? 'Gastos' :'No hay gastos en esta Categoria'}</h2>
        {  gastos.map(gasto=>(
            <Gasto key={gasto.id} gasto={gasto} setGastoeditar={setGastoeditar} eliminarGasto={eliminarGasto}/>
          )) }
        </>
        )
        }
    </div>
  )
}

export default ListadoGastos