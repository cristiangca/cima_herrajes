# Medición con el Analytics existente

Se utiliza la propiedad GA4 `G-QEEDJ58YGH`. Se conserva el contenedor GTM `GTM-NV7FNFFT`. No se agregaron servicios de pago, dependencias ni etiquetas de otras plataformas. La versión estándar de Google Analytics es gratuita; Analytics 360 es un producto de pago aparte.

Los eventos se envían mediante el `gtag` existente y `send_to` limita su destino a esa propiedad. No hace falta crear otra etiqueta GA4 por cada evento en GTM.

## Eventos implementados

| Evento | Momento | Datos |
| --- | --- | --- |
| `visita_ruta` | Cambio de página de React | ruta sin consulta ni fragmento |
| `ver_seccion` | Una sección entra en la zona visible, una vez por página | sección, ruta |
| `profundidad_pagina` | Al alcanzar 25, 50, 75 y 90 % del desplazamiento | porcentaje, ruta |
| `navegacion_interna` | Clic en enlace interno | ruta y sección de destino, origen |
| `categoria_catalogo` | Categoría activa del catálogo | categoría |
| `seleccionar_producto` | Clic para ampliar un producto | producto, categoría, acabado |
| `producto_visto` | Apertura del modal, también por enlace directo | producto, categoría, acabado |
| `cerrar_producto` | Cierre del modal | producto, categoría |
| `seleccionar_acabado` | Clic en aluminio, luces LED o herrajes | categoría, tipo, acabado |
| `busqueda_catalogo` | Tras 900 ms sin cambiar la búsqueda | longitud y cantidad de resultados; sin el texto |
| `zoom_catalogo` | Cambiar o restablecer tamaño | nivel, categoría |
| `share` | Compartir con éxito o copiar enlace | producto, categoría, método |
| `click_whatsapp` | Abrir WhatsApp desde botón o enlace | origen y, en catálogo, producto/acabado |
| `click_contacto` | Clic en teléfono o correo | tipo y origen; sin número ni dirección |
| `interes_servicio` | Activar recomendaciones de un servicio | identificador de servicio |
| `seleccionar_solucion` | Clic en llamadas a la acción de soluciones | origen, sección |
| `cambiar_portada` | Alternar imagen principal | origen |
| `abrir_pregunta` | Expandir una pregunta frecuente | sección e índice, sin texto |
| `inicio_formulario` | Primer foco dentro de un formulario | ruta; sin campos |
| `envio_formulario` | Evento submit del formulario, incluso si abre revisión local | ruta; no significa envío recibido ni venta |

`producto_visto` y `categoria_catalogo` son eventos personalizados, no informes de ecommerce ni compras. Los clics en WhatsApp son intención de contacto, no mensajes enviados confirmados. La consulta del catálogo no garantiza que todas las tarjetas hayan aparecido en la pantalla; `ver_seccion` mide visibilidad de la sección.

## Configuración en GA4 tras publicar

1. Publicar el proyecto con estos cambios; no se modificó el sitio alojado automáticamente.
2. Revisar los eventos en **Informes > Tiempo real** o usar Tag Assistant con **DebugView**.
3. En **Administrar > Visualización de datos > Definiciones personalizadas**, crear dimensiones de alcance **Evento** con los parámetros: `origen`, `categoria`, `producto_id`, `producto_nombre`, `acabado`, `tipo`, `seccion`, `ruta` y `method`.
4. Si se necesitan informes numéricos, crear métricas personalizadas de alcance Evento para `resultados`, `longitud_busqueda`, `nivel` y `porcentaje`. Todos son números sin unidad.
5. Marcar `click_whatsapp` como evento clave si se desea medir intención de contacto. No usarlo como prueba de venta ni de mensaje enviado. No se configura ningún valor monetario ficticio.
6. Crear una exploración: `producto_visto` → `click_whatsapp`, agrupada por `producto_id`, `categoria` o `acabado`.

Las dimensiones personalizadas no son retroactivas y sus informes pueden tardar 24–48 horas después de crearlas.

## Vistas y duplicados

No se añadió un `page_view` manual: se mantiene el mecanismo automático actual de GA4. Para React, verificar en el flujo web que **Medición mejorada > Vistas de página > Cambios de página basados en eventos del historial del navegador** esté configurado como se desea. Los cambios de URL del modal también pueden contarse como vistas automáticas según esa opción; para analizar páginas reales se proporciona `visita_ruta`, que solo cambia con el pathname.

En la vista previa de GTM, comprobar que el contenedor no instale otra configuración de la misma propiedad ni vuelva a enviar estos eventos con un activador genérico. No se pudo inspeccionar el contenido publicado del contenedor desde el repositorio, por lo que no se puede garantizar ausencia de duplicados externos. No crear etiquetas adicionales para reenviar los eventos nuevos.

## Datos y mantenimiento

`src/utilidades/analytics.js` contiene el destino y la lista cerrada de parámetros. Se eliminó el parámetro `mensaje` que antes acompañaba WhatsApp. Los eventos nuevos no extraen ni envían campos de formularios, mensajes, búsquedas libres o URLs completas. Los parámetros automáticos que recopila Google y las etiquetas publicadas en GTM se controlan por separado en esas cuentas.

La medición no bloquea navegación o contacto si Google está bloqueado o no carga. Las observaciones y listeners se limpian al cambiar de página. La medición respeta el estado que tenga configurado la etiqueta existente; no se fuerza consentimiento ni se modifica su configuración.

Pruebas locales: `node --test tests/analytics.test.mjs`, ESLint de archivos modificados y `npm run build`. Estas pruebas validan la integración y los datos locales, no confirman recepción en la cuenta GA4.

Documentación oficial:
- https://www.google.com/intx/en_id/business/faq/
- https://developers.google.com/analytics/devguides/collection/ga4/reference/events
- https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
- https://support.google.com/analytics/answer/14240153
