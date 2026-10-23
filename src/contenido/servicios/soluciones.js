// EDITABLE: las cuatro soluciones, sus textos y los IDs de productos que muestran sus fotos.
import { CATEGORIAS } from '../catalogo/productos.js'
const PRODUCTOS = new Map(CATEGORIAS.flatMap(categoria => categoria.productos.map(producto => [producto.id, producto])))
export const SOLUCIONES = [
  { slug: 'residencial', titulo: 'Soluciones residenciales', texto: 'Ventanas, puertas y canceles para tu hogar.', productos: ['v-corredizas', 'c-fijo-corredizo', 'v-proyectable', 'c-fijo'] },
  { slug: 'comercial', titulo: 'Soluciones comerciales', texto: 'Accesos y divisiones para tu negocio.', productos: ['p-doble-templada', 'p-para-oficina', 'p-batiente', 'p-corrediza'] },
  { slug: 'arquitectonico', titulo: 'Proyectos arquitectónicos', texto: 'Vidrio y aluminio a la medida de tu proyecto.', productos: ['b-empotrado', 'est-pergola', 'b-anclas', 'est-domo'] },
  { slug: 'domotica', titulo: 'Automatización', texto: 'Accesos y persianas inteligentes para tu día a día.', productos: ['dom-cerraduras', 'dom-persianas', 'dom-iluminacion', 'dom-smart-glass', 'dom-puertas', 'dom-motores', 'dom-sensores'] },
].map(solucion => ({ ...solucion, fotos: solucion.productos.map(id => {
  const producto = PRODUCTOS.get(id)
  return [producto.img, producto.TITULO, producto.id]
}) }));
