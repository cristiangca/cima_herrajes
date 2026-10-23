# CIMA Herrajes — sitio web de estadías

Sitio para presentar servicios y productos de CIMA Herrajes y solicitar cotizaciones por WhatsApp.

**Manual completo con imágenes:** [abrir MANUAL_COMPLETO.html](docs/MANUAL_COMPLETO.html). Reúne todas las guías, instrucciones paso a paso e inventario. Funciona sin conexión y permite imprimir o guardar como PDF. Para regenerarlo: `npm run manual`.

Para el personal de la empresa: consultar [el manual de mantenimiento](docs/MANUAL.md) y [la lista de entrega](docs/ENTREGA.md).

## Ejecutar y verificar

Instalar Node.js con npm y abrir una terminal en la carpeta del proyecto:

```sh
npm ci
npm run dev
```

Abrir la dirección indicada en la terminal. Ctrl+C detiene el servidor.

- `npm run lint`: revisión del código.
- `npm run build`: genera la carpeta publicable `dist`.
- `npm run preview`: permite revisar la compilación localmente.

Conservar `package-lock.json` para reproducir las dependencias. No editar `dist`: se regenera en cada compilación.

## Organización

| Ubicación | Función |
| --- | --- |
| src/contenido/general/sitio.js | Contacto y textos de portada |
| src/contenido/inicio/ | Servicios, proyectos, testimonios y textos de inicio |
| src/contenido/catalogo/categorias/ | Un archivo por categoría de productos |
| src/styles/tema.css | Colores generales de inicio |
| src/styles/ | Estilos de inicio, catálogo y pilares |
| src/pages/ | Páginas y comportamiento |
| src/components/ | Componentes compartidos |
| src/assets/ | Imágenes locales |
| public/ | Archivos públicos, iconos y redirecciones |
| src/App.jsx | Rutas del sitio |
| index.html | Idioma, título, descripción y analítica |

Usa React, Vite y React Router. No incluye servidor, base de datos ni panel funcional para subir productos. Los cambios requieren editar archivos, compilar y publicar. Rutas: /, /catalogo, /servicios y /servicios/:idproductos.

## Actualizar contenidos e imágenes

Empieza en [src/contenido/README.md](src/contenido/README.md). Las imágenes están agrupadas por sección y categoría en [src/assets](src/assets/README.md).

- `npm run validar:contenido`: verifica JSON, rutas e IDs de productos.
- `npm run inventario:imagenes`: actualiza el inventario de fotografías y dónde se utilizan.
