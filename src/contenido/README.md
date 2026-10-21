# Guía de contenido e imágenes

Los textos y las imágenes se actualizan aquí sin modificar los componentes de la página.

- `sitio.js`: contacto y textos de portada.
- `inicio.js`: servicios, proyectos y contenido de inicio.
- `catalogo.js`: categorías y productos. Cada imagen se importa desde el proyecto.
- `opcionesCatalogo.js`: nombres y colores de luces LED y acabados de aluminio.
- `acabadosVentanas.js`: correspondencia entre producto, acabado e imagen.
- `canceles-bano.js` y `espejos.js`: imágenes y variantes de esos productos.
- `proyectos.js` y `fotos-proyecto.js`: información y fotografías de proyectos.
- `imagenes-origen.json`: relación de archivo local y URL original. Es documentación; la web no necesita consultar esas URLs.

## Actualizar un producto

1. Busca su `id` en `catalogo.js`.
2. Edita `TITULO` para cambiar su nombre visible. El título es independiente del nombre del archivo.
3. Para sustituir una fotografía, reemplaza el archivo importado conservando nombre y extensión, o cambia el import para apuntar al nuevo archivo.
4. Conserva `id` y `slug` para mantener los enlaces compartidos y la selección de acabados.
5. Ejecuta `npm run build` antes de entregar.

## Organización de assets

- `assets/catalogo/`: descargas por categoría; conserva subcarpetas de modelos y fabricantes.
- `assets/marca/`: logotipo.
- `assets/inicio/`: portada e imágenes de inicio.
- `assets/servicios/`: imágenes de presentación de servicios.
- `assets/proyectos/` y `assets/proyectos-referencia/`: fotografías de proyectos.
- `assets/domotica/`, `assets/muebles/` y `assets/acabados/`: material local de esas categorías.
- `assets/canceles-bano/`, `assets/espejos-50-imagenes/`, `assets/ventanas-acabados/` y `assets/ventanales-acabados/`: variantes que se buscan por modelo, luz o acabado. Mantén sus nombres para que funcionen esas opciones.
- `assets/referencias/`: material suelto conservado para revisión; no se eliminó.

Las imágenes se incluyen en la compilación de Vite. Entrega el código con `src/assets`, `src/contenido`, `package.json` y `package-lock.json`; para publicar, utiliza la carpeta `dist` generada por el build.

## Recuperación de imágenes

`node scripts/localizar-imagenes.mjs` comprueba los archivos registrados y descarga los que falten. Requiere Node 20 o superior y acceso a internet. No reemplaza archivos existentes, para respetar actualizaciones manuales. El registro documenta una fuente de domótica que devolvía 404 y su sustitución local.
