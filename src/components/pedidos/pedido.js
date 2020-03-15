import React from 'react'

function Pedido (props) {
  const {pedido,eliminarPedido} = props
  return (
    <li className="pedido">
          <div className="info-pedido">
            <p className="id">ID: {pedido._id}</p>
            <p className="nombre">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                  {
                    pedido.pedido.map(item => (
                     <li key={item._id}>
                        <p>{item.producto.nombre}</p>
                        <p>Precio unitario: ${item.producto.precio}</p>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio total: ${item.producto.precio * item.cantidad}</p>
                    </li>
                    ))
                  }
                </ul>
            </div>
            <p className="total">Total: $ {pedido.total} </p>
          </div>
          <div className="acciones">
            {/* <a href="#" className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Pedido
            </a> */}

            <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(pedido._id)}>
                <i className="fas fa-times"></i>
                Eliminar Pedido
            </button>
          </div>
  </li>
  )
}

export default Pedido;