import {Button, Form, Row, Col, Alert} from 'react-bootstrap'
import useCategorias from '../hooks/useCategorias'
import {useState} from 'react'
import useBebidas from '../hooks/useBebidas'

const Formulario = () => {

    const {categorias} = useCategorias()
    const {consultarBebida}= useBebidas()

    const [busqueda, setBusqueda] = useState({
        nombre:'',
        categoria:''
    })

    const [alerta, setAlerta] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()

        if(Object.values(busqueda).includes('')){
            setAlerta('Todos los Campos son Obligatorios')
            return
        }
        setAlerta('')
        consultarBebida(busqueda)
    }

  return (
    <Form onSubmit={handleSubmit}>

        {alerta&& <Alert className='text-center' variant='danger'>{alerta}</Alert>}
        <Row>
            <Col md={6}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>

                    <Form.Control 
                        id='nombre'
                        type='text'
                        placeholder='Ej: Tequila, Yusca, etc'
                        name='nombre'
                        value={busqueda.nombre}
                        onChange={e=> setBusqueda(
                           { ...busqueda,
                            [e.target.name]:e.target.value
                        }
                        )}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className='mb-3'>
                    <Form.Label htmlFor='categoria'>Categoria Bebida</Form.Label>

                    <Form.Select id='categoria' name='categoria' value={busqueda.categoria} onChange={e=> setBusqueda(
                           { ...busqueda,
                            [e.target.name]:e.target.value
                        }
                        )}>
                        <option>-- Selecciona la Categoria --</option>
                        {categorias.map(categoria=>(
                            <option value={categoria.strCategory} key={categoria.strCategory}>
                                {categoria.strCategory}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className='justify-content-end'>
            <Col md={3}>
                <Button variant='danger' className='text-uppercase w-100' type='submit'>
                    Buscar Bebidas
                </Button>
            </Col>
        </Row>
    </Form>
  )
}

export default Formulario