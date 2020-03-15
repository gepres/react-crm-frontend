import axios from 'axios';

const clientesAxios = axios.create({
  baseURL:'http://localhost:3000'
})

export default clientesAxios;