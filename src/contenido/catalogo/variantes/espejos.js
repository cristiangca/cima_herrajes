const archivos = import.meta.glob('../../../assets/catalogo/espejos-led-touch/*/*.jpg', { eager: true, query: '?url', import: 'default' })
export const LUCES_ESPEJO = ['blanco-calido', 'blanco-frio', 'luz-dia', 'ambar', 'azul']
export function imagenesEspejo(modelo) {
  return Object.fromEntries(LUCES_ESPEJO.map(luz => [luz, archivos[`../../../assets/catalogo/espejos-led-touch/${luz}/${modelo}.jpg`]]))
}
