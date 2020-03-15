import React,{useContext} from 'react'
import {CRMContext} from '../../context/CRMContext'
import { withRouter} from "react-router-dom";


const Header = (props) => {
  const [auth,guardarAuth] = useContext(CRMContext)
  // console.log(auth);

  const cerrarSesion = () => {
    // auth.auth = false
    guardarAuth({
      token:'',
      auth:false
    })
    localStorage.removeItem('token','')
    props.history.push('/iniciar-sesion')
  }


  return(
    <header className="barra">
      <div className="contenedor">
          <div className="contenido-barra">
            <h1>CRM - Administrador de Clientes</h1>
            {auth.auth ? (
              <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
                <i className="far fa-times-circle"></i>
                Cerrar Sesión
              </button>
            ):null}
            
          </div>
      </div>
    </header>
  )
}

export default withRouter(Header);