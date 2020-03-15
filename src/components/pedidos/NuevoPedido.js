import React,{Fragment,useState, useEffect} from 'react'
import clientesAxios from '../../config/axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import FormBuscarProducto from './FormBuscarProductos'
import FormCantidadProducto from './FormCantidadProducto'

function NuevoPedido (props) {
  // extraer el id del cliente
  const {id} = props.match.params 

  // state
  const [cliente,guardarCliente] = useState({})
  const [busqueda,guardarBusqueda] = useState('')
  const [productos, guardarProductos] = useState([])
  const [total, guardarTotal] = useState(0)


  useEffect(() => {
    // obtener el cliente
    const consultarAPI = async () => {
      const resultado = await clientesAxios.get(`/api/clientes/${id}`)
      // console.log(resultado.data.cliente);
      guardarCliente(resultado.data.cliente)
    }
    // actualizar el total a pagar
    const actualizarPagar = () => {
      // si el arreglo de productos es igual 0  : el total es cero
      if(productos.length === 0){
        guardarTotal(0)
        return;
      }

      // calcular nuevo total
      let nuevoTotal = 0;
      // recorrer todos los productos, sus cantidades y precios
      productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
      // almacenar en el total
      guardarTotal(nuevoTotal)
    }

    consultarAPI()
    actualizarPagar()
  },[productos,id])


  // buscar productos
  const buscarProducto = async (e) => {
    e.preventDefault()
    // obtener los productos de la busqueda
    const resultadoBusqueda = await clientesAxios.get(`/api/productos/busqueda/${busqueda}`)
    // console.log(resultadoBusqueda.data.producto);

    // si no hay resultado una alerta
    if (resultadoBusqueda.data.producto[0]) {
      let productoResultado = resultadoBusqueda.data.producto[0]
      // agregar la llave producto
      productoResultado.producto = resultadoBusqueda.data.producto[0]._id
      productoResultado.cantidad = 0
      //  ponerlo en el state
      guardarProductos([...productos,productoResultado])
    }else{
      Swal.fire({
        icon:'error',
        title:'El Producto no se encuentra'
      })
    }
    
  }

  // alamacenar una busqueda en el state
  const leerDatosBusqueda = (e) => {
    guardarBusqueda(e.target.value)
  }

  // actualizar la cantidad dde productos
  const restarProductos = (i) => {
    // copiar el arreglo original
    const todosProductos = [...productos]
    // validar si esta en 0 no puede ir mas alla
    if(todosProductos[i].cantidad === 0) return ;
    // decremento
    todosProductos[i].cantidad--;
    // almacenar en el state
    guardarProductos(todosProductos)

  }
  const aumentarProductos = (i) => {
    // copiar el arreglo original
    const todosProductos = [...productos]
    // ingremento
    todosProductos[i].cantidad++;
    // almacenar en el state
    guardarProductos(todosProductos)
  }

  // eliminar un producto del state
  const eliminarProductoPedido = id => {
    const todosProductos = productos.filter(producto => producto.producto !== id )
    guardarProductos(todosProductos)
  }


  

  // almacena el pedido en la base de datos
  const realizarPedido = async e => {
    e.preventDefault();
    const {id} = props.match.params
    // construir el objecto
    const pedido = {
      "cliente" : id,
      "pedido": productos,
      "total": total
    }
    console.log(pedido);
    // almancenarlo en la base de daos
    const resultado = await clientesAxios.post(`/api/pedidos/${id}`,pedido)
    if(resultado.status === 200){
      Swal.fire(
        'Se agregó el Pedido',
        resultado.data.mensaje,
        'success'
      )
    }else{
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text:'Vuelva a intentarlo'
      })
    }
    props.history.push('/pedidos')
  }

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
        <p>Telefono: {cliente.telefono}</p>
      </div>
      <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />
          <ul className="resumen">
            { productos.map((item,index) => (
              <FormCantidadProducto 
                key={item.producto} 
                producto={item}
                restarProductos={restarProductos}
                aumentarProductos={aumentarProductos}
                eliminarProductoPedido={eliminarProductoPedido}
                index={index}
              />
            ))
            }
          </ul>
          <p className="total">Total a Pagar: <span>$ {total}</span></p>

          {
            total > 0 ? (
              <form onSubmit={realizarPedido}>
                 <div className="campo">
                 <input type="submit" className="btn btn-verde btn-block"  value="Realizar Pedido"/>
                 </div>
              </form>
            ): null
          }

    </Fragment>
  )
}

export default withRouter(NuevoPedido);