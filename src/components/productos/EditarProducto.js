import React,{Fragment,useState,useEffect} from 'react'
import clientesAxios from '../../config/axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import Spinner from '../layout/Spinner'

function EditarProducto(props){
   //obtener el id
   const {id} = props.match.params;

  // use state
  const [producto,guardarProducto] = useState({
    nombre:'',
    precio:'',
    imagen:''
  })

  // const archivo = state
  const [archivo, guardarArchivo] = useState('')

  // use effect
  useEffect(()=>{
    const consultarAPI = async () => {
      const productoConsulta = await clientesAxios.get(`/api/productos/${id}`)
      // console.log(productoConsulta.data.producto);
      guardarProducto(productoConsulta.data.producto)
    }
    consultarAPI()
  },[id])

  // edita un producto en la base de datos
  const editarProducto = async e => {
    e.preventDefault();
    // crear un formdata para q capte la imagen
    const formdata = new FormData();
    formdata.append('nombre',producto.nombre)
    formdata.append('precio',producto.precio)
    if(archivo !== ''){
      formdata.append('imagen',archivo)
    }
   console.log(producto.nombre);
   console.log(producto.precio);
   console.log(archivo);
   
   
    
    // alamcenarlo en la base de datos
    try {
      const res = await clientesAxios.put(`/api/productos/${id}`,formdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      Swal.fire(
        'Se actualizo el Producto',
        res.data.mensaje,
        'success'
      )
      props.history.push('/productos')
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text:'Vuelva a intentarlo'
      })
    }
  }

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

  if(!producto) return <Spinner />

  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            onChange={leerInformacionProducto}
            value={producto.nombre}
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
            value={producto.precio}
          />
        </div>
        <div className="campo">
          <label>Imagen Actual:</label>
          {producto.imagen ? ( <img src={producto.imagen} alt={producto.nombre} width="300" />) : null}
        </div>
        <div className="campo">
          <label>Imagen Nueva:</label>
          <input type="file"  
            name="imagen"
            onChange={LeerArchivo}
          />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="editar Producto" />
        </div>
      </form>
    </Fragment>
  )
}

export default withRouter(EditarProducto);