import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import {withRouter} from 'react-router-dom'
// importar el context
import {CRMContext} from '../../context/CRMContext'

function Login (props){

  // auth y token
  const [auth,guardarAuth] = useContext(CRMContext)


  // state de formulario
  const [credenciales, guardarCredenciales] = useState({
    email:'',
    password:''
  })
  const leerDatos = e => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name] : e.target.value
    })
  }

  // iniciar sesion 
  const iniciarSesion = async (e) => {
    e.preventDefault();
    // auntenticar usuario
    try {
      const respuesta = await clienteAxios.post('/api/usuarios/iniciar-sesion',credenciales)
      const {token} = respuesta.data     
      localStorage.setItem('token',token)
      // colocarlo en el state
      guardarAuth({
        token,
        auth:true
      })
      // alerta
      Swal.fire(
        'Login Correcto',
        'Has Iniciado Sesión',
        'success'
      )
      // redireccionar
      props.history.push('/')

    } catch (error) {
      // console.log(error);
      if(error.response){
        Swal.fire({
          icon:'error',
          title:error.response.data.mensaje,
          text:'Vuelva a intentarlo'
        })
      }else{
        Swal.fire({
          icon:'error',
          title:'Hubo un error',
          text:'Hubo un error'
        })
      }
      
    }
  }

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Correo:</label>
            <input type="text" name="email" placeholder="Correo" onChange={leerDatos} />
          </div>
          <div className="campo">
            <label>Email:</label>
            <input type="password" name="password" placeholder="Contraseña" onChange={leerDatos}  />
          </div>
          <div className="campo">
            <input type="submit" className="btn btn-verde btn-block" value="Ingresar" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login);