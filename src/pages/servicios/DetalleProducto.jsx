import { Link } from 'react-router-dom'
import { FaWhatsapp, FaShareAlt, FaArrowLeft } from 'react-icons/fa'
import { CATEGORIAS } from '../Catalogo'
import '../../styles/catalogo.css'

const NUMERO_WHATSAPP = "521234567890"; // Mismo número que en Catalogo

export default function DetalleProducto({ idproductos }) {
  let productoEncontrado = null
  let categoriaEncontrada = null

  for (const categoria of CATEGORIAS) {
    const encontrado = categoria.productos.find(p => p.id === idproductos)
    if (encontrado) {
      productoEncontrado = encontrado
      categoriaEncontrada = categoria
      break
    }
  }

  // ===== Producto no encontrado =====
  if (!productoEncontrado) {
    return (
      <div className="detalle-no-encontrado">
        <h1>Producto no encontrado</h1>
        <p>
          No existe un producto con el ID: <strong>{idproductos}</strong>
        </p>
        <Link to="/servicios" className="detalle-btn-volver">
          <FaArrowLeft /> Volver al catálogo
        </Link>
      </div>
    )
  }

  // ===== Acciones =====
  const obtenerEnlaceWhatsApp = () => {
    const mensaje = encodeURIComponent(
      `Hola, me interesa cotizar el producto: ${productoEncontrado.TITULO}`
    );
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  };

  const compartirProducto = async () => {
    const url = window.location.href;
    const data = {
      title: productoEncontrado.TITULO,
      text: `Mira este producto: ${productoEncontrado.TITULO}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
      }
    } catch (err) {
      // Cancelado por el usuario
    }
  };

  return (
    <div className="detalle-container">
      {/* Breadcrumb / volver */}
      <Link to="/servicios" className="detalle-btn-volver">
        <FaArrowLeft /> Volver al catálogo
      </Link>

      <div className="detalle-card">
        {/* Imagen */}
        <div className="detalle-img-wrapper">
          <img
            src={productoEncontrado.img}
            alt={productoEncontrado.TITULO}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="detalle-info">
          <span className="detalle-categoria">{categoriaEncontrada.TITULO}</span>
          <h1>{productoEncontrado.TITULO}</h1>

          <div className="detalle-meta">
            <p><strong>ID:</strong> {productoEncontrado.id}</p>
            <p><strong>Slug:</strong> {productoEncontrado.slug}</p>
          </div>

          {/* Acciones */}
          <div className="detalle-acciones">
            <a
              href={obtenerEnlaceWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accion btn-whatsapp"
            >
              <FaWhatsapp /> Cotizar por WhatsApp
            </a>

            <button
              className="btn-accion btn-compartir"
              onClick={compartirProducto}
            >
              <FaShareAlt /> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}