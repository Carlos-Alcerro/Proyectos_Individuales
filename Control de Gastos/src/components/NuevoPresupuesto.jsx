import React,{ useState } from "react"
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPres}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto=(e)=>{
    e.preventDefault()
    if( !presupuesto || presupuesto < 0){
      setMensaje('No puede ser enviado, hay un error')
      return
    }
      setMensaje('');
      setIsValidPres(true)
  }

  const onChangeInp =(e)=>{
    setPresupuesto(Number(e.target.value))
  }

  return (
    <div className="contenedor-presupuesto contenedor sombre">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupusto</label>
          <input className="nuevo-presupuesto" type='number' placeholder="Nuevo Presupuesto" value={presupuesto}
          onChange={onChangeInp}
          />
        </div>
        <input type='submit' value="Añadir"/>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
