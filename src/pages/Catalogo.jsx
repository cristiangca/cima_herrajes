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
  { id: 'led-rgb',           nombre: 'RGB',           hex: 'linear-gradient(90deg,#FF0000,#FFD700,#00FF00,#00BFFF,#8A2BE2)' },
  { id: 'led-azul',          nombre: 'Azul',          hex: '#4FC3F7' },
];
// Índice plano precalculado para búsquedas rápidas
const PRODUCTOS_FLAT = CATEGORIAS.flatMap((cat) =>
  cat.productos.map((prod) => ({ ...prod, categoriaPadre: cat.TITULO, categoriaSlug: cat.slug }))
);
const PRODUCTOS_POR_CATEGORIA = new Map(CATEGORIAS.map((cat) => [
  cat.slug, PRODUCTOS_FLAT.filter((producto) => producto.categoriaSlug === cat.slug)
]));

// ===== Item memoizado =====
const CatalogoItem = memo(function CatalogoItem({
  producto, interactivo, onOpenModal, onWhatsApp, onCompartir, onVerProducto, destacado
}) {
  return (
    <div className={`catalogo-item ${destacado ? 'destacado-azul' : ''}`}>
      <div className="catalogo-img-wrapper" onClick={() => onOpenModal(producto)}>
        <img src={producto.img} alt={producto.TITULO} loading="lazy" decoding="async" />
      </div>
      <h2>{producto.TITULO}</h2>
      {destacado && <span className="catalogo-recomendado">De interés para tu servicio</span>}
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
  const [productoModal, setProductoModal] = useState(null);
  const busquedaDiferida = useDeferredValue(busqueda);

  // Cuando se activa un servicio, selecciona su primera categoría y hace scroll
  useEffect(() => {
    if (!servicioActivo) return;
    const primera = servicioActivo.categorias?.[0];
    if (primera) setCategoriaSeleccionada(primera);
    setBusqueda('');
    const el = document.getElementById('que-hacemos');
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
    const mensaje = encodeURIComponent(`Hola, me interesa cotizar el producto: ${nombreProducto}`);
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  }, []);

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

     <div className="catalogo-grid">
  {categoriaSeleccionada === 'espejos-led-touch' && !busqueda && (
    <div className="catalogo-colores-led">
      <h3 className="catalogo-colores-led-titulo">Colores LED disponibles</h3>
      <div className="catalogo-colores-led-lista">
        {COLORES_LED.map((color) => (
          <div key={color.id} className="catalogo-color-led-item" title={color.nombre}>
            <span
              className="catalogo-color-led-swatch"
              style={{ background: color.hex }}
              aria-hidden="true"
            />
            <span className="catalogo-color-led-nombre">{color.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  )}

  {productosVisibles.map((producto) => {
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
