import { useParams } from 'react-router-dom'

import DetalleProducto from './DetalleProducto'
import Catalogo from '../Catalogo'

export default function Servicios() {
  const { idproductos } = useParams()

  // Si no hay parámetro → mostramos el catálogo completo
  if (!idproductos) {
    return <Catalogo interactivo={true} />
  }

  // Si hay parámetro → mostramos el detalle del producto
  return <DetalleProducto idproductos={idproductos} />
}