import { useState, useMemo, useCallback, useEffect, useDeferredValue, memo } from 'react';
import '../styles/catalogo.css';

import { FaWhatsapp, FaSearch, FaTimes, FaShareAlt } from 'react-icons/fa';
import { useServicioActivo } from './catalogo/ServicioActivoContext';
import { CATEGORIAS } from '../contenido/catalogo'
import { CONTACTO } from '../contenido/sitio'
const NUMERO_WHATSAPP = CONTACTO.whatsapp

// ===== COLORES LED DISPONIBLES =====
const COLORES_LED = [
  { id: 'led-blanco-calido', nombre: 'Blanco Cálido', hex: '#FFD9A0' },
  { id: 'led-blanco-frio',   nombre: 'Blanco Frío',   hex: '#E8F4FF' },
  { id: 'led-luz-dia',       nombre: 'Luz Día',       hex: '#FFFFFF' },
  { id: 'led-ambar',         nombre: 'Ámbar',         hex: '#FFB347' },
  { id: 'led-azul',          nombre: 'Azul',          hex: '#4FC3F7' },
];
const ACABADOS_ALUMINIO = [
  { id: 'negro', nombre: 'Negro', hex: '#222222' },
  { id: 'blanco', nombre: 'Blanco', hex: '#ffffff' },
  { id: 'natural-gris', nombre: 'Natural / gris', hex: '#b9bdc1' },
  { id: 'champagne', nombre: 'Champagne', hex: '#c5b898' },
  { id: 'gris-europa', nombre: 'Gris Europa', hex: '#656a70' },
];
// Índice plano precalculado para búsquedas rápidas
const PRODUCTOS_FLAT = CATEGORIAS.flatMap((cat) =>
  cat.productos.map((prod) => ({ ...prod, categoriaPadre: cat.TITULO, categoriaSlug: cat.slug }))
);
const PRODUCTOS_POR_CATEGORIA = new Map(CATEGORIAS.map((cat) => [
  cat.slug, PRODUCTOS_FLAT.filter((producto) => producto.categoriaSlug === cat.slug)
]));

// Las capas se cargan juntas para fundir la iluminación sin parpadeos.
function ImagenEspejo({ producto }) {
  const luzActiva = producto.luz || 'blanco-calido';
  return <div className="catalogo-espejo-luces" role="img" aria-label={`${producto.TITULO}, ${COLORES_LED.find(color => color.id === 'led-' + luzActiva)?.nombre}`}>
    <img className="espejo-luz-base" src={producto.luces['blanco-calido']} alt="" aria-hidden="true" />
    {Object.entries(producto.luces).map(([luz, src]) => <img key={luz} src={src} alt="" aria-hidden="true"
      className={`espejo-luz-capa ${luzActiva === luz ? 'encendida' : ''}`} decoding="async" />)}
  </div>;
}

// ===== Item memoizado =====
const CatalogoItem = memo(function CatalogoItem({
  producto, interactivo, onOpenModal, onWhatsApp, onCompartir, onVerProducto, destacado
}) {
  return (
    <div className={`catalogo-item ${destacado ? 'destacado-azul' : ''}`}>
      <div className="catalogo-img-wrapper" onClick={() => onOpenModal(producto)}>
        <>{producto.luces ? <ImagenEspejo producto={producto} /> : <img src={producto.img} alt={producto.TITULO} loading="lazy" decoding="async" />}</>
      </div>
      <h2>{producto.TITULO}</h2>
      {/* {producto.categoriaPadre && (
        <span className="categoria-tag">{producto.categoriaPadre}</span>
      )} */}
      {interactivo && (
        <div className="catalogo-item-acciones">
          <a
            href={onWhatsApp(producto.TITULO)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accion btn-whatsapp"
            onClick={(e) => e.stopPropagation()}
            title="Cotizar por WhatsApp"
          >
            <FaWhatsapp /> Cotizar
          </a>
          <button
            className="btn-accion btn-compartir"
            onClick={(e) => onCompartir(producto, e)}
            title="Compartir producto"
          >
            <FaShareAlt /> Compartir
          </button>
        </div>
      )}
      {interactivo && (
        <button className="btn-ver-producto" onClick={(e) => onVerProducto(producto, e)}>
          Ver producto →
        </button>
      )}
    </div>
  );
});

export default function Catalogo({ interactivo = false }) {
  const { servicioActivo, limpiarServicio } = useServicioActivo();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('puertas');
  const [busqueda, setBusqueda] = useState('');
  const [acabadoSeleccionado, setAcabadoSeleccionado] = useState('');
  const [luzSeleccionada, setLuzSeleccionada] = useState('');
  const esVentana = ['ventanas', 'ventanales'].includes(categoriaSeleccionada);
  const [productoModal, setProductoModal] = useState(null);
  const busquedaDiferida = useDeferredValue(busqueda);

  // Cuando se activa un servicio, selecciona su primera categoría y hace scroll
  useEffect(() => {
    if (!servicioActivo) return;
    const primera = servicioActivo.categorias?.[0];
    if (primera) setCategoriaSeleccionada(primera);
    setBusqueda('');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start'
    });
  }, [servicioActivo]);

  // Productos de la categoría activa
  const productosCategoria = useMemo(() => {
    return PRODUCTOS_POR_CATEGORIA.get(categoriaSeleccionada) || [];
  }, [categoriaSeleccionada]);

  // Búsqueda sobre el índice plano
  const productosVisibles = useMemo(() => {
    if (!busquedaDiferida.trim()) return productosCategoria;
    const q = busquedaDiferida.trim().toLowerCase();
    return PRODUCTOS_FLAT.filter((p) => p.TITULO.toLowerCase().includes(q));
  }, [busquedaDiferida, productosCategoria]);

  // Handlers estables
  const obtenerEnlaceWhatsApp = useCallback((nombreProducto) => {
    const acabado = esVentana && acabadoSeleccionado ? `, acabado: ${acabadoSeleccionado}` : '';
    const luz = categoriaSeleccionada === 'espejos-led-touch' ? `, luz: ${COLORES_LED.find(color => color.id === luzSeleccionada)?.nombre || 'Blanco Cálido'}` : '';
    const mensaje = encodeURIComponent(`Hola, me interesa cotizar el producto: ${nombreProducto}${acabado}${luz}`);
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  }, [esVentana, acabadoSeleccionado, categoriaSeleccionada, luzSeleccionada]);

  const obtenerUrlProducto = useCallback((producto) => {
    return `${window.location.origin}/servicios/${producto.id}`;
  }, []);

  const compartirProducto = useCallback(async (producto, e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const url = obtenerUrlProducto(producto);
    const data = { title: producto.TITULO, text: `Mira este producto: ${producto.TITULO}`, url };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(url); alert('Enlace copiado al portapapeles'); }
    } catch { /* cancelado */ }
  }, [obtenerUrlProducto]);

  const irAProducto = useCallback((producto, e) => {
    if (e) e.stopPropagation();
    window.location.href = `/servicios/${producto.id}`;
  }, []);

  const abrirModal = useCallback((p) => setProductoModal(p), []);
  const cerrarModal = useCallback(() => setProductoModal(null), []);

  const setCategoria = useCallback((slug) => {
    setCategoriaSeleccionada(slug);
    setAcabadoSeleccionado('');
    setLuzSeleccionada('');
  }, []);

  // Categorías relacionadas al servicio activo (para resaltar)
  const categoriasDestacadas = useMemo(
    () => new Set(servicioActivo?.categorias || []),
    [servicioActivo]
  );

  return (
    <div className="catalogo-container">
      <div className="catalogo-servicio-aviso" role="status" aria-live="polite">
        {servicioActivo && <>
          <p>Opciones en azul para: <strong>{servicioActivo.titulo || servicioActivo.slug}</strong></p>
          <button type="button" onClick={limpiarServicio}>Quitar recomendaciones</button>
        </>}
      </div>
      {interactivo && (
        <div className="catalogo-buscador">
          <FaSearch className="catalogo-buscador-icon" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="catalogo-buscador-clear" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">
              <FaTimes />
            </button>
          )}
        </div>
      )}

      {!busqueda && (
        <div className="catalogo-filtros">
          {CATEGORIAS.map((cat) => {
            const relacionada = categoriasDestacadas.has(cat.slug);
            return (
              <button
                key={cat.slug}
                type="button"
                aria-pressed={categoriaSeleccionada === cat.slug}
                aria-label={`${cat.TITULO}${relacionada ? ', de interés para el servicio seleccionado' : ''}`}
                className={`catalogo-filtro ${categoriaSeleccionada === cat.slug ? 'active' : ''} ${relacionada ? 'relacionada-azul' : ''}`}
                onClick={() => setCategoria(cat.slug)}
              >
                {cat.TITULO}
              </button>
            );
          })}
        </div>
      )}

      {esVentana && !busqueda && (
        <div className="catalogo-colores-led">
          <h3 className="catalogo-colores-led-titulo">Acabados para ventanas y ventanales</h3>
          <div className="catalogo-colores-led-lista">

            {ACABADOS_ALUMINIO.map((color) => (
              <button key={color.id} type="button" className="catalogo-color-led-item catalogo-acabado"
                aria-pressed={acabadoSeleccionado === color.nombre} onClick={() => setAcabadoSeleccionado(actual => actual === color.nombre ? '' : color.nombre)}>
                <span className="catalogo-color-led-swatch" style={{ background: color.hex }} aria-hidden="true" />
                <span className="catalogo-color-led-nombre">{color.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      )}
     <div className="catalogo-grid">
  {categoriaSeleccionada === 'espejos-led-touch' && !busqueda && (
    <div className="catalogo-colores-led">
      <h3 className="catalogo-colores-led-titulo">Colores LED disponibles</h3>
      <div className="catalogo-colores-led-lista">
        {COLORES_LED.map((color) => (
          <button key={color.id} type="button" className="catalogo-color-led-item catalogo-acabado" title={color.nombre}
            aria-pressed={luzSeleccionada === color.id}
            onClick={() => setLuzSeleccionada(actual => actual === color.id ? '' : color.id)}>
            <span
              className="catalogo-color-led-swatch"
              style={{ background: color.hex }}
              aria-hidden="true"
            />
            <span className="catalogo-color-led-nombre">{color.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  )}

  {productosVisibles.map((original) => {
    const luz = luzSeleccionada.replace('led-', '') || 'blanco-calido';
    const producto = original.luces ? { ...original, luz, img: original.luces[luz] } : original;
    const destacado = servicioActivo && (
      producto.categoriaSlug
        ? categoriasDestacadas.has(producto.categoriaSlug)
        : categoriasDestacadas.has(categoriaSeleccionada)
    );
    return (
      <CatalogoItem
        key={producto.id}
        producto={producto}
        interactivo={interactivo}
        onOpenModal={abrirModal}
        onWhatsApp={obtenerEnlaceWhatsApp}
        onCompartir={compartirProducto}
        onVerProducto={irAProducto}
        destacado={destacado}
      />
    );
  })}
</div>

      {productoModal && (
        <div className="catalogo-modal-overlay" onClick={cerrarModal}>
          <div className="catalogo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="catalogo-modal-close" onClick={cerrarModal} aria-label="Cerrar">
              <FaTimes />
            </button>
            <img src={productoModal.img} alt={productoModal.TITULO} />
            <h2>{productoModal.TITULO}</h2>
            {interactivo && (
              <div className="catalogo-modal-acciones">
                <a href={obtenerEnlaceWhatsApp(productoModal.TITULO)} target="_blank" rel="noopener noreferrer" className="btn-accion btn-whatsapp">
                  <FaWhatsapp /> Cotizar por WhatsApp
                </a>
                <button className="btn-accion btn-compartir" onClick={(e) => compartirProducto(productoModal, e)}>
                  <FaShareAlt /> Compartir
                </button>
                <button className="btn-accion btn-ver-producto" onClick={(e) => irAProducto(productoModal, e)}>
                  Ver producto completo →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
