import { formatearTexto } from '../../utilidades/plantillas.js'
import TEXTOS from '../../contenido/catalogo/textos/DetalleProducto.json'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { FaWhatsapp, FaShareAlt, FaArrowLeft } from 'react-icons/fa'
import { CATEGORIAS } from "../../contenido/catalogo/productos.js"
import '../../styles/catalogo.css'

import { CONTACTO } from "../../contenido/general/sitio.js"
import { registrarEvento, datosProducto } from '../../utilidades/analytics'
const NUMERO_WHATSAPP = CONTACTO.whatsapp

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

  useEffect(() => {
    const categoria = CATEGORIAS.find(item => item.productos.some(producto => producto.id === idproductos));
    const producto = categoria?.productos.find(item => item.id === idproductos);
    if (producto) registrarEvento('producto_visto', datosProducto({ ...producto, categoriaSlug: categoria.slug }));
  }, [idproductos]);

  // ===== Producto no encontrado =====
  if (!productoEncontrado) {
    return (
      <div className="detalle-no-encontrado">
        <h1>{TEXTOS.producto_no_encontrado}</h1>
        <p>{TEXTOS.no_existe_un_producto_con_el_id}<strong>{idproductos}</strong>
        </p>
        <Link to="/servicios" className="detalle-btn-volver">
          <FaArrowLeft />{TEXTOS.volver_al_catalogo}</Link>
      </div>
    )
  }

  // ===== Acciones =====
  const obtenerEnlaceWhatsApp = () => {
    const mensaje = encodeURIComponent(
      formatearTexto(TEXTOS["plantilla_hola_me_interesa_cotizar_el_producto"], { dato1: (productoEncontrado.TITULO) })
    );
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  };

  const compartirProducto = async () => {
    const url = window.location.href;
    const data = {
      title: productoEncontrado.TITULO,
      text: formatearTexto(TEXTOS["plantilla_mira_este_producto_dato1"], { dato1: (productoEncontrado.TITULO) }),
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        alert(TEXTOS.enlace_copiado_al_portapapeles);
      }
      registrarEvento('share', { ...datosProducto({ ...productoEncontrado, categoriaSlug: categoriaEncontrada.slug }), method: navigator.share ? 'native' : 'clipboard', content_type: 'producto', item_id: productoEncontrado.id });
    } catch {
      // Cancelado por el usuario
    }
  };

  return (
    <div className="detalle-container">
      {/* Breadcrumb / volver */}
      <Link to="/servicios" className="detalle-btn-volver">
        <FaArrowLeft />{TEXTOS.volver_al_catalogo}</Link>

      <div className="detalle-card">
        {/* Imagen */}
        <div className="detalle-img-wrapper">
          <img
            src={productoEncontrado.imgDetalle || productoEncontrado.img}
            alt={productoEncontrado.TITULO}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="detalle-info">
          <span className="detalle-categoria">{categoriaEncontrada.TITULO}</span>
          <h1>{productoEncontrado.TITULO}</h1>

          <div className="detalle-meta">
            <p><strong>{TEXTOS.id}</strong> {productoEncontrado.id}</p>
            <p><strong>{TEXTOS.slug}</strong> {productoEncontrado.slug}</p>
          </div>

          {/* Acciones */}
          <div className="detalle-acciones">
            <a
              href={obtenerEnlaceWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accion btn-whatsapp"
              data-origen="detalle-producto"
              data-producto-id={productoEncontrado.id}
              data-producto-nombre={productoEncontrado.TITULO}
              data-categoria={categoriaEncontrada.slug}
            >
              <FaWhatsapp />{TEXTOS.cotizar_por_whatsapp}</a>

            <button
              className="btn-accion btn-compartir"
              onClick={compartirProducto}
            >
              <FaShareAlt />{TEXTOS.compartir}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
