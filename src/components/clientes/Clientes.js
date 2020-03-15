import React,{Fragment,useEffect,useState,useContext} from 'react'
import { Link ,withRouter} from "react-router-dom";
// importar clientes axios
import clientesAxios from '../../config/axios'

// components
import Cliente from './Cliente'
import Spinner from '../layout/Spinner'

// importar el context
import {CRMContext} from '../../context/CRMContext'

function Clientes(props) {
  // trabajar con el state
  // clientes = state, guardarClientes = funcion para guardar el state
  const [clientes,guardarClientes] = useState([])

  // utilizar valores de context
  const [auth,guardarAuth] = useContext(CRMContext)

  // console.log(auth);
  
  // use effect es similar a componentdidmount y willmount
  useEffect(() => {
    if(auth.token !== ''){
      // query a la API
      const consultarAPI = async () => {
        try {
          const clientesConsultas = await clientesAxios.get('/api/clientes',{
            headers:{
              Authorization:`${auth.token}`
            }
          })
          // console.log(clientesConsultas.data.clientes);
          // colocar el resultado en el state
          guardarClientes(clientesConsultas.data.clientes);
        } catch (error) {
          // error con autorizacion
          if(error.response.status = 500){
            props.history.push('/iniciar-sesion')
          }
        }
      }
      consultarAPI()
    }else{
      props.history.push('/iniciar-sesion')
    }
  },[clientes])

  // spinner de carga
  if(!clientes.length) return <Spinner />
  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"}  className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map(item => (
           <Cliente cliente={item} key={item._id} />
        ))}
      </ul>
    </Fragment>
  )
}

export default withRouter(Clientes);