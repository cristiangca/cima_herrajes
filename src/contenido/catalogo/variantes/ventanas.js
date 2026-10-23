const imagenes = import.meta.glob([
  '../../../assets/catalogo/ventanas/variantes/*/*.png',
  '../../../assets/catalogo/ventanales/variantes/*/*.png',
], { eager: true, query: '?url', import: 'default' });

export function imagenConAcabado(producto, acabado, original = producto.img) {
  if (!acabado || !['ventanas', 'ventanales'].includes(producto.categoriaSlug)) return original;
  const carpeta = acabado === 'natural-gris' ? 'natural' : acabado;
  return imagenes[`../../../assets/catalogo/${producto.categoriaSlug}/variantes/${carpeta}/${producto.slug}.png`] || original;
}
