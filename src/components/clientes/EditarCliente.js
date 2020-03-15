import React,{Fragment,useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import clientesAxios from '../../config/axios';

function EditarCliente(props){
  //obtener el id
  const {id} = props.match.params;
  
  // consultar api
  useEffect(() => {
    const consultarAPI = async () => {
      await clientesAxios.get(`/api/clientes/${id}`).then(res => {
        // console.log(res.data.cliente);
        datosCliente(res.data.cliente)
      })
    }
    consultarAPI();
  },[id])

  // cliente = state | datosCliente = function para guardar el state
  const [cliente,datosCliente] = useState({
    nombre:'',
    apellido:'',
    empresa:'',
    email:'',
    telefono:''
  })


  // obtener datos del cliente
 

  // leer los datos del formulario
  const actualizarState = e => {
    // almancenar lo que el usuario escribe en el state
    datosCliente({
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

  // envia una peticion por axios para actualizar el cliente
  const actualizarCliente = async(e) => {
    e.preventDefault();

    // enviar peticion
    await clientesAxios.put(`/api/clientes/${cliente._id}`,cliente)
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
            'Se actualizo el cliente',
            res.data.mensaje,
            'success'
          )
        }
        props.history.push('/')
    })
  }
  
  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" 
            placeholder="Nombre Cliente"
            name="nombre" 
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" 
            placeholder="Apellido Cliente" 
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" 
            placeholder="Empresa Cliente" 
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" 
            placeholder="Email Cliente" 
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="tel" 
            placeholder="Teléfono Cliente" 
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input type="submit" 
            className="btn btn-azul" 
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  )
}
//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);
