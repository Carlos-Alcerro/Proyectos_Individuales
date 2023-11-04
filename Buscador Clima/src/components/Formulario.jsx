import useClima from '../hooks/useClima'
import {useState} from 'react'

const Formulario = () => {

    const {busqueda, datosBusqueda,consultarClima} = useClima()
    const {ciudad, pais}=busqueda
    
    const [alerta, setAlerta] = useState('')

    const handleSubmit = e =>{
        e.preventDefault()
        if(Object.values(busqueda).includes('')){
            setAlerta('Todos los campos son Obligatorios')
            return
        }
        setAlerta('')
        consultarClima(busqueda)
    }

  return (
     <div className='contenedor'>
        {alerta && <p>{alerta}</p>}
        <form onSubmit={handleSubmit}>
            <div className='campo'>
                <label htmlFor="ciudadd">Ciudad</label>
                <input type='text' id="ciudad" name='ciudad' onChange={datosBusqueda} value={ciudad}/>
            </div>
            <div className='campo'>
                <label htmlFor="pais">Pais</label>
                <select name="pais" id="pais" onChange={datosBusqueda} value={pais}>
                    <option value="">---Selecciona un Pais ---</option>
                    <option value="US">Estados Unidos</option>
                    <option value="AR">Argentina</option>
                    <option value="MX">Mexico</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">Espana</option>
                    <option value="PE">Peru</option>
                    <option value="HN">Honduras</option>
                </select>
            </div>
            <input type="submit" value="Consultar Clima"/>
        </form>
     </div>
  )
}

export default Formulario