import React,{Fragment,useEffect,useState,useContext} from 'react'
import { Link } from "react-router-dom";
// importar clientes axios
import clientesAxios from '../../config/axios'
// components
import Producto from './Producto'
import Spinner from '../layout/Spinner'

// importar el context
import {CRMContext} from '../../context/CRMContext'

function Productos(props) {

  // state
  const [productos, guardarProductos] = useState([])

    // utilizar valores de context
    const [auth,guardarAuth] = useContext(CRMContext)

  // obtener los datos

   // use effect
   useEffect(() => {
    if(auth.token !== ''){
    const obtenerDatos = async () => {
      try {
        const productosConsultas =  await clientesAxios.get('/api/productos',{
          headers:{
            Authorization:`${auth.token}`
          }
        })
        // console.log(productosConsultas.data.productos);
        guardarProductos(productosConsultas.data.productos)
      } catch (error) {
        if(error.response.status = 500){
          props.history.push('/iniciar-sesion')
        }
      }
      
    }
    obtenerDatos()
    }else{
      props.history.push('/iniciar-sesion')
    }
  },[productos])

  // spinner de carga
  if(!productos.length) return <Spinner />

  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      <ul className="listado-productos">
        {productos.map(item => (
          <Producto producto={item} key={item._id} />
        ))}
        
      </ul>
    </Fragment>
  )
}

export default Productos;