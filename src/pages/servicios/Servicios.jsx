import { useParams } from 'react-router-dom'
import '../../styles/home.css'
import './servicios.css'
import DetalleProducto from './DetalleProducto'
import Catalogo from '../Catalogo'
import ComoTrabajamos from '../inicio/componentes/comoTrabajamos.jsx'
import Proceso from '../inicio/componentes/Proceso.jsx'
import Valores from '../inicio/componentes/Valores.jsx'
import Encabezado from '../inicio/componentes/EncabezadoServ.jsx'


export default function Servicios() {
  const { idproductos } = useParams()

  // Si no hay parámetro → mostramos el catálogo completo junto con los componentes
  if (!idproductos) {
    return (
      <div>
<Encabezado/>
      {/*  <ComoTrabajamos /> */}
        <Catalogo interactivo={false} />
<Valores/>
      </div>
    )
  }

  // Si hay parámetro → mostramos el detalle del producto
  return <DetalleProducto idproductos={idproductos} />
}
