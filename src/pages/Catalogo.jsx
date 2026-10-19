import { useState, useMemo, useCallback, useEffect, useDeferredValue, memo } from 'react';
import '../styles/catalogo.css';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaWhatsapp, FaSearch, FaTimes, FaShareAlt } from 'react-icons/fa';
import { useServicioActivo } from './catalogo/ServicioActivoContext';
import { CATEGORIAS } from '../contenido/catalogo'
import { CONTACTO } from '../contenido/sitio'
import { abrirWhatsApp } from './inicio/utilidades/whatsapp'
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
      <button type="button" className="catalogo-img-wrapper" aria-label={`Ampliar ${producto.TITULO}`} onClick={() => onOpenModal(producto)}>
        <>{producto.luces ? <ImagenEspejo producto={producto} /> : <img src={producto.img} alt={producto.TITULO} loading="lazy" decoding="async" />}</>
      </button>
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
          Ampliar imagen →
        </button>
      )}
    </div>
  );
});

export default function Catalogo({ interactivo = false }) {
  const { servicioActivo, limpiarServicio } = useServicioActivo();

  const location = useLocation();
  const navigate = useNavigate();
  const parametros = new URLSearchParams(location.search);
  const productoEnlace = PRODUCTOS_FLAT.find(producto => producto.id === parametros.get('producto'));
  const colorEnlace = parametros.get('color');
  const [categoriaBase, setCategoriaSeleccionada] = useState('puertas');
  const categoriaSeleccionada = productoEnlace?.categoriaSlug || categoriaBase;
  const [busqueda, setBusqueda] = useState('');
  const [acabadoSeleccionado, setAcabadoSeleccionado] = useState('');
  const [luzSeleccionada, setLuzSeleccionada] = useState('');
  const esVentana = ['ventanas', 'ventanales'].includes(categoriaSeleccionada);
  const luzEnlace = COLORES_LED.find(color => color.id === 'led-' + colorEnlace);
  const acabadoEnlace = ACABADOS_ALUMINIO.find(color => color.id === colorEnlace);
  const colorModal = productoEnlace?.luces ? (luzEnlace?.nombre || 'Blanco Cálido')
    : (['ventanas', 'ventanales'].includes(productoEnlace?.categoriaSlug) ? acabadoEnlace?.nombre : null);
  const productoModal = productoEnlace ? { ...productoEnlace,
    img: productoEnlace.luces ? productoEnlace.luces[luzEnlace ? colorEnlace : 'blanco-calido']
      : productoEnlace.imgDetalle || productoEnlace.img } : null;
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

  const rutaProducto = useCallback((producto) => {
    const params = new URLSearchParams(location.search);
    params.set('producto', producto.id);
    params.delete('color');
    if (producto.luces) params.set('color', producto.luz || 'blanco-calido');
    else if (['ventanas', 'ventanales'].includes(producto.categoriaSlug)) {
      const acabado = ACABADOS_ALUMINIO.find(color => color.nombre === acabadoSeleccionado);
      if (acabado) params.set('color', acabado.id);
    }
    return { pathname: location.pathname, search: '?' + params.toString(), hash: location.hash };
  }, [location.pathname, location.search, location.hash, acabadoSeleccionado]);

  const obtenerUrlProducto = useCallback((producto) => {
    const ruta = rutaProducto(producto);
    return window.location.origin + ruta.pathname + ruta.search + ruta.hash;
  }, [rutaProducto]);

  const compartirProducto = useCallback(async (producto, e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const url = obtenerUrlProducto(producto);
    const data = { title: producto.TITULO, text: `Mira este producto: ${producto.TITULO}`, url };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(url); alert('Enlace copiado al portapapeles'); }
    } catch { /* cancelado */ }
  }, [obtenerUrlProducto]);

  const abrirModal = useCallback((producto) => {
    setCategoriaSeleccionada(producto.categoriaSlug);
    navigate(rutaProducto(producto));
  }, [navigate, rutaProducto]);
  const irAProducto = useCallback((producto, event) => {
    event?.stopPropagation();
    abrirModal(producto);
  }, [abrirModal]);
  const cerrarModal = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete('producto');
    params.delete('color');
    if (productoEnlace) {
      setCategoriaSeleccionada(productoEnlace.categoriaSlug);
      if (productoEnlace.luces) setLuzSeleccionada(luzEnlace?.id || 'led-blanco-calido');
      if (acabadoEnlace) setAcabadoSeleccionado(acabadoEnlace.nombre);
    }
    navigate({ pathname: location.pathname, search: params.toString() ? '?' + params.toString() : '', hash: location.hash }, { replace: true });
  }, [navigate, location.pathname, location.search, location.hash, productoEnlace, luzEnlace, acabadoEnlace]);

  const modalAbierto = Boolean(productoEnlace);
  useEffect(() => {
    if (!modalAbierto) return;
    const anterior = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.querySelector('.catalogo-modal-close')?.focus();
    return () => { document.body.style.overflow = overflow; anterior?.focus(); };
  }, [modalAbierto]);

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
          <div className="catalogo-modal catalogo-ampliacion" role="dialog" aria-modal="true" aria-labelledby="titulo-ampliacion"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Escape') { event.stopPropagation(); cerrarModal(); }
              if (event.key === 'Tab') {
                const botones = event.currentTarget.querySelectorAll('button, a[href]');
                const primero = botones[0];
                const ultimo = botones[botones.length - 1];
                if (event.shiftKey && document.activeElement === primero) { event.preventDefault(); ultimo?.focus(); }
                else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primero?.focus(); }
              }
            }}>
            <button className="catalogo-modal-close" onClick={cerrarModal} aria-label="Cerrar">
              <FaTimes />
            </button>
            <img src={productoModal.img} alt={productoModal.TITULO} />
            <h2 id="titulo-ampliacion">{productoModal.TITULO}</h2>
            {colorModal && <div className="catalogo-modal-color">
              <span className="catalogo-color-led-item catalogo-modal-capsula">
                <span className="catalogo-color-led-swatch" style={{ background: productoEnlace.luces ? (luzEnlace || COLORES_LED[0]).hex : acabadoEnlace.hex }} aria-hidden="true" />
                <span>Color: <strong>{colorModal}</strong></span>
              </span>
            </div>}
            <button type="button" className="catalogo-modal-cotizar" onClick={() => {
              const enlace = window.location.origin + location.pathname + location.search + location.hash;
              const color = colorModal ? `\nColor: ${colorModal}` : '';
              abrirWhatsApp(`Hola Cima Herrajes, me gustaría cotizar este modelo: ${productoModal.TITULO}.${color}\nEnlace: ${enlace}`, 'modal-producto');
            }}>
              <FaWhatsapp size={14} aria-hidden="true" /> Cotizar este modelo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
