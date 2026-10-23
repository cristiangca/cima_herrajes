const fotos = import.meta.glob('../../../assets/catalogo/canceles-de-bano/*.webp', { eager: true, query: '?url', import: 'default' })
export function imagenCancelBano(nombre, version = 'tarjeta') {
  return fotos[`../../../assets/catalogo/canceles-de-bano/${nombre}-${version}.webp`]
}
