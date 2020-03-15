import React,{Fragment,useState} from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

function NuevoProducto({history}){
  // use state
  const [producto,guardarProducto] = useState({
    nombre:'',
    precio:''
  })
  // const archivo = state
  const [archivo, guardarArchivo] = useState('')

  // leer los datos del formulario
   const leerInformacionProducto = e => {
    guardarProducto({
      // obtener copia del state actual
      ...producto,
      [e.target.name] : e.target.value
    })   
   }

  // coloca la imagen en el state
   const LeerArchivo = e => {
    //  console.log(e.target.files[0]);
    guardarArchivo(e.target.files[0])
   }

  //  almacena el nuevo producto
  const agregarProducto = async (e) => {
    e.preventDefault();

    // crear un formdata para q capte la imagen
    const formdata = new FormData();
    formdata.append('nombre',producto.nombre)
    formdata.append('precio',producto.precio)
    formdata.append('imagen',archivo)

    // alamcenarlo en la base de datos
    try {
      const res = await clienteAxios.post('/api/productos',formdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      Swal.fire(
        'Se agregó el Producto',
        res.data.mensaje,
        'success'
      )
      history.push('/productos')
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text:'Vuelva a intentarlo'
      })
    }
  }

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>
      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            onChange={leerInformacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number" 
            name="precio" 
            min="0.00" 
            step="0.01" 
            placeholder="Precio"
            onChange={leerInformacionProducto}
          />
        </div>
            
        <div className="campo">
          <label>Imagen:</label>
          <input type="file"  
            name="imagen"
            onChange={LeerArchivo}
          />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  )
}

export default withRouter(NuevoProducto);