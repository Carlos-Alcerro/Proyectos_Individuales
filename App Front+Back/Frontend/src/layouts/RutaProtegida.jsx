import {Outlet,Navigate} from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import useAuth from '../hooks/useAuth'



const RutaProtegida = () => {

    const {auth,cargando} = useAuth() 
    console.log(auth);
    if(cargando) return 'Cargandoooooo.....'
  return (
    <>
        {auth._id ? (
            <div className='bg-gray-100'>
                <Header/>
            <div className='md:flex md:min-h-screen'>
                <SideBar/>
                
                <main className='flex-1 p-10'>
                {/* flex-1 hace que tome el resto del contenido de la pantalla */}
                <Outlet/>
                </main>
            </div>
            </div>
        ) : <Navigate to="/"/> }
    </>
  )
}

export default RutaProtegida