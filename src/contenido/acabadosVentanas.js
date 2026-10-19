const imagenes = import.meta.glob([
  '../assets/ventanas-acabados/*/*.png',
  '../assets/ventanales-acabados/*/*.png',
], { eager: true, query: '?url', import: 'default' });

export function imagenConAcabado(producto, acabado, original = producto.img) {
  if (!acabado || !['ventanas', 'ventanales'].includes(producto.categoriaSlug)) return original;
  const carpeta = acabado === 'natural-gris' ? 'natural' : acabado;
  return imagenes[`../assets/${producto.categoriaSlug}-acabados/${carpeta}/${producto.slug}.png`] || original;
}
