import {useState,useEffect} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPres}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    const formatearCant =(cantidad)=>{
       return cantidad.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }

    useEffect(() => {
        const totalGastos= gastos.reduce((total,gasto)=>gasto.cantidad+total,0)
        const totalDisponible=presupuesto-totalGastos
        
        //Calculando Porcentaje
        const CalPor= (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)

        
        setTimeout(() => {
            setPorcentaje(CalPor)    
        }, 1500);
        setGastado(totalGastos)
        setDisponible(totalDisponible)
        
    }, [gastos])

    const handleResetApp =()=>{
        const resultado = confirm('Deseas resetear Todo?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPres(false)
        }else{
            console.log('No');
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar text={`${porcentaje}% Gastado`} value={porcentaje} 
            styles={buildStyles({
                pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                strokeLinecap: "butt"
            })}/>
        </div>

        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto :</span> {formatearCant(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible :</span> {formatearCant(disponible)}
            </p>

            <p>
                <span>Gastado :</span> {formatearCant(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto