import React,{Fragment,useState} from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

function NuevoCliente({history}){
  // cliente = state | guardarCliente = function para guardar el state
  const [cliente,guardarCliente] = useState({
    nombre:'',
    apellido:'',
    empresa:'',
    email:'',
    telefono:''
  })

  // leer los datos del formulario
  const actualizarState = e => {
    // almancenar lo que el usuario escribe en el state
    guardarCliente({
      // obtener copia del estate actual
      ...cliente,
      [e.target.name] : e.target.value
    })   
  }

  // validar formulario
  const validarCliente = () => {
    // destructuring
    const {nombre,apellido,email,empresa,telefono} = cliente
    // revisar las propiedades del objecto tengan contenido
    let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

    // return true o false
    return valido
  }

  // agregar cliente a la REST API
  const agregarCliente = (e) => {
    e.preventDefault();

    // enviar peticion
    clienteAxios.post('/api/clientes',cliente)
      .then(res => {
        if(res.data.code === 11000){
          Swal.fire({
            icon:'error',
            title:'Hubo un error',
            text:'Ese cliente ya esta registrado'
          })
        }else{
          console.log(res.data);
          Swal.fire(
            'Se agregó el cliente',
            res.data.mensaje,
            'success'
          )
        }
        // redirecionar
        history.push('/')
      })
  }

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" 
            placeholder="Nombre Cliente"
            name="nombre" 
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" 
            placeholder="Apellido Cliente" 
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" 
            placeholder="Empresa Cliente" 
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" 
            placeholder="Email Cliente" 
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" 
            placeholder="Teléfono Cliente" 
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input type="submit" 
            className="btn btn-azul" 
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  )
}
//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
