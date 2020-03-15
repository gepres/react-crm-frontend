import React from 'react'

function FormBuscarProductos(props){
  return(
    <form onSubmit={props.buscarProducto}>
      <legend>Busca un Producto y agrega una cantidad</legend>
      <div className="campo">
        <label>Productos:</label>
        <input type="text" placeholder="Nombre Productos" name="productos" onChange={props.leerDatosBusqueda} />
      </div>
      <input type="submit" value="Buscar Productos" className="btn btn-azul btn-block" />
    </form>
  )
}

export default FormBuscarProductos;