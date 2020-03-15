import React from 'react'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

function Cliente({cliente}){ 

  // eliminar cliente
  const EliminarCliente = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Un cliente eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        // axios
        clienteAxios.delete(`/api/clientes/${id}`).then(res =>{
          Swal.fire(
          'Eliminado!',
          res.data.mensaje,
          'success'
          )
        })
        
      }
    })
  }

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">{cliente.nombre} {cliente.apellido}</p>
        <p className="empresa">{cliente.empresa}</p>
        <p>{cliente.email}</p>
        <p>Tel: {cliente.telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/pedidos/nuevo/${cliente._id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button type="button" 
          className="btn btn-rojo btn-eliminar"
          onClick={() => EliminarCliente(cliente._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  )
}

export default Cliente;