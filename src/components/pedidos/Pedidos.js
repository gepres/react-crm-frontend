import React,{Fragment,useEffect,useState,useContext} from 'react'
import clientesAxios from '../../config/axios'
import Swal from 'sweetalert2'
import Pedido from './pedido'
import Spinner from '../layout/Spinner'
// importar el context
import {CRMContext} from '../../context/CRMContext'


function Pedidos(props) {
  const [pedidos, guardarPedidos] = useState([])

  // utilizar valores de context
  const [auth,guardarAuth] = useContext(CRMContext)

  useEffect(() => {
    if(auth.token !== ''){
    const consultarAPI = async () => {
      try {
        const resultado = await clientesAxios.get('/api/pedidos',{
          headers:{
            Authorization:`${auth.token}`
          }
        })
        // console.log(resultado.data.pedidos);
        
        guardarPedidos(resultado.data.pedidos)
      } catch (error) {
        if(error.response.status = 500){
          props.history.push('/iniciar-sesion')
        }
      }
    
    }
    consultarAPI()
    }else{
      props.history.push('/iniciar-sesion')
    }
  },[pedidos])

  // eliminar pedido
  const eliminarPedido = async (id) => {
    await clientesAxios.delete(`/api/pedidos/${id}`).then(res => {
      Swal.fire(
        'Pedído Eliminado',
        res.data.mensaje,
        'success'
      )
    })
    
  }
  if(!pedidos.length) return <Spinner />
  return (
    <Fragment>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        { 
          pedidos.map(item => (
            <Pedido pedido={item} key={item._id} eliminarPedido={eliminarPedido}  />
          ))
        }
      </ul>
    </Fragment>
  )
}

export default Pedidos;