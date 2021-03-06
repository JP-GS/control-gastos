import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [modoeditar, setModoeditar] = useState(false);
    

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)            
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            setModoeditar(true)
          }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);        
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 1800);
            return            
        } 
        guardarGasto({nombre, cantidad, categoria, id, fecha})       
    }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn} 
                alt="boton cerrar modal" 
                onClick={ocultarModal}
            />
        </div>  

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{modoeditar ? 'Editar Gasto' : 'Nuevo Gasto'}</legend> 

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>    
                <input 
                    id='nombre'
                    type="text"
                    placeholder='A??ade el nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>  

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>    
                <input 
                    id='cantidad'
                    type="number"
                    placeholder='A??ade la cantidad del gasto: Ej. 300'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>     

            <div className='campo'>
                <label htmlFor="categoria">Categor??a</label>    
                <select 
                    id="categoria" 
                    value={categoria} 
                    onChange={e => setCategoria(e.target.value)}
                >

                    <option value="">-- Seleccione --</option>    
                    <option value="ahorro">Ahorro</option>    
                    <option value="comida">Comida</option>    
                    <option value="casa">Casa</option>    
                    <option value="gastos">Gastos</option>    
                    <option value="ocio">Ocio</option>    
                    <option value="salud">Salud</option>    
                    <option value="suscripciones">Susucripciones</option>    
                </select>
                
            </div>  

            <input 
                type="submit"
                value={modoeditar ? 'Guardar Cambios' : 'A??adir Gasto'}
            />   
        </form>
    </div>
  )
}

export default Modal