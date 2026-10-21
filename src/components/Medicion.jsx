import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { registrarEvento } from '../utilidades/analytics';

// GA4 conserva sus page_view automáticos. No se dispara un segundo page_view manual.
export default function Medicion() {
  const { pathname } = useLocation();
  useEffect(() => {
    registrarEvento('visita_ruta', { ruta: pathname });
    const vistos = new Set();
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entradas => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const seccion = entrada.target.id;
        if (!vistos.has(seccion)) {
          vistos.add(seccion);
          registrarEvento('ver_seccion', { seccion, ruta: pathname });
        }
        observer.unobserve(entrada.target);
      }
    }, { threshold: 0, rootMargin: '-15% 0px -15% 0px' });
    document.querySelectorAll('section[id], #catalogo').forEach(elemento => observer?.observe(elemento));
    const profundidades = new Set();
    const formulariosIniciados = new WeakSet();
    const iniciarFormulario = evento => {
      const formulario = evento.target.closest?.('form');
      if (!formulario || formulariosIniciados.has(formulario)) return;
      formulariosIniciados.add(formulario);
      registrarEvento('inicio_formulario', { ruta: pathname });
    };
    const enviarFormulario = () => registrarEvento('envio_formulario', { ruta: pathname });
    let frame = 0;
    const medirScroll = () => {
      frame = 0;
      const largo = document.documentElement.scrollHeight - window.innerHeight;
      if (largo <= 0) return;
      const avance = window.scrollY / largo * 100;
      for (const porcentaje of [25, 50, 75, 90]) if (avance >= porcentaje && !profundidades.has(porcentaje)) {
        profundidades.add(porcentaje);
        registrarEvento('profundidad_pagina', { porcentaje, ruta: pathname });
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(medirScroll); };
    const click = evento => {
      const enlace = evento.target.closest?.('a[href]');
      if (enlace) {
        const href = enlace.getAttribute('href');
        const origen = enlace.closest('section[id], [id="catalogo"]')?.id || 'navegacion';
        if (href.startsWith('tel:') || href.startsWith('mailto:')) registrarEvento('click_contacto', { tipo: href.startsWith('tel:') ? 'telefono' : 'correo', origen });
        else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) registrarEvento('click_whatsapp', {
          origen: enlace.dataset.origen || origen,
          producto_id: enlace.dataset.productoId,
          producto_nombre: enlace.dataset.productoNombre,
          categoria: enlace.dataset.categoria,
          acabado: enlace.dataset.acabado,
        });
        else if (href.startsWith('/') || href.startsWith('#')) {
          const destino = new URL(href, window.location.origin);
          registrarEvento('navegacion_interna', { ruta: destino.pathname, seccion: destino.hash.slice(1), origen });
        }
      }
      const boton = evento.target.closest?.('button');
      if (boton?.matches('.especialidad-cta, .servicio-destacado-trigger, .servicios-cta-final, .reciente-cotizar')) registrarEvento('seleccionar_solucion', { origen: boton.classList[0], seccion: boton.closest('section[id]')?.id });
      if (boton?.matches('.hero-cambiar-imagen')) registrarEvento('cambiar_portada', { origen: 'portada' });
      const pregunta = evento.target.closest?.('summary');
      if (pregunta && !pregunta.parentElement.open) registrarEvento('abrir_pregunta', { seccion: pregunta.closest('section[id]')?.id, nivel: Array.from(document.querySelectorAll('summary')).indexOf(pregunta) + 1 });
    };
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('click', click);
    document.addEventListener('focusin', iniciarFormulario);
    document.addEventListener('submit', enviarFormulario);
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); document.removeEventListener('click', click); document.removeEventListener('focusin', iniciarFormulario); document.removeEventListener('submit', enviarFormulario); };
  }, [pathname]);
  return null;
}
