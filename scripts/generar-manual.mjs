// Genera un HTML autónomo con imágenes integradas, sin dependencias adicionales.
// Ejecutar: npm run manual
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const unix = value => value.replaceAll('\\', '/');
const read = file => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const excluded = new Set(['node_modules', '.git', '.agents', '.codex', 'dist', 'output']);
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? excluded.has(entry.name) ? [] : walk(path.join(dir, entry.name))
    : [unix(path.join(dir, entry.name))]);
}
const files = walk('.').map(file => file.replace(/^\.\//, ''));
const readmes = files.filter(file => path.posix.basename(file).toLowerCase() === 'readme.md').sort();
const documents = ['docs/MANUAL.md', 'docs/ENTREGA.md', 'docs/ANALYTICS.md'].filter(file => fs.existsSync(file));
const sources = [...readmes, ...documents];
const guideIds = new Map(sources.map((file, index) => [file, `guia-${index + 1}`]));
const assets = files.filter(file => file.startsWith('src/assets/') && /\.(png|jpe?g|webp|svg|gif|avif)$/i.test(file));
const categories = files.filter(file => file.startsWith('src/contenido/catalogo/categorias/') && file.endsWith('.js')).sort();
const imageCache = new Map();
function embedImage(file) {
  const resolved = path.resolve(file);
  if (!resolved.startsWith(path.resolve('src/assets') + path.sep)) throw Error(`Imagen fuera de assets: ${file}`);
  if (!imageCache.has(file)) {
    if (!fs.existsSync(file)) throw Error(`Imagen del manual inexistente: ${file}`);
    const extension = path.extname(file).slice(1).toLowerCase();
    const type = { jpg: 'jpeg', svg: 'svg+xml' }[extension] || extension;
    imageCache.set(file, `data:image/${type};base64,${fs.readFileSync(file).toString('base64')}`);
  }
  return imageCache.get(file);
}
function localLink(label, href, source) {
  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) return `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
  if (href.startsWith('#')) return `<a href="${escape(href)}">${escape(label)}</a>`;
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(source), href));
  if (guideIds.has(target)) return `<a href="#${guideIds.get(target)}" data-open-guide>${escape(label)}</a>`;
  if (target === 'docs/MANUAL_COMPLETO.html') return `<a href="#inicio">${escape(label)}</a>`;
  if (target.endsWith('INVENTARIO.md')) return `<a href="#inventario">${escape(label)}</a>`;
  return `<code title="${escape(target)}">${escape(label)}</code>`;
}
function inline(text, source) {
  const tokens = [];
  const token = html => `\u0000${tokens.push(html) - 1}\u0000`;
  text = text.replace(/`([^`]+)`/g, (_, value) => token(`<code>${escape(value)}</code>`));
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => token(localLink(label, href, source)));
  text = escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
}
function markdown(text, source, headingOffset = 2) {
  const lines = text.split('\n');
  const output = [];
  let i = 0;
  const isTable = line => /^\s*\|.*\|\s*$/.test(line);
  const cells = line => line.trim().slice(1, -1).split('|').map(cell => cell.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^\s*```/.test(line)) {
      const code = []; i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i++]);
      i++; output.push(`<pre><code>${escape(code.join('\n'))}</code></pre>`); continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) { const level = Math.min(6, heading[1].length + headingOffset); output.push(`<h${level}>${inline(heading[2], source)}</h${level}>`); i++; continue; }
    if (isTable(line) && i + 1 < lines.length && /^\s*\|[\s:|\-]+\|\s*$/.test(lines[i + 1])) {
      const headings = cells(line); i += 2;
      const rows = []; while (i < lines.length && isTable(lines[i])) rows.push(cells(lines[i++]));
      output.push(`<table><thead><tr>${headings.map(cell => `<th>${inline(cell, source)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${inline(cell, source)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue;
    }
    const list = line.match(/^\s*(?:([-*])|(\d+)\.)\s+(.+)$/);
    if (list) {
      const type = list[2] ? 'ol' : 'ul'; const items = [];
      while (i < lines.length) {
        const next = lines[i].match(/^\s*(?:([-*])|(\d+)\.)\s+(.+)$/);
        if (!next || (next[2] ? 'ol' : 'ul') !== type) break;
        items.push(`<li>${inline(next[3], source)}</li>`); i++;
      }
      output.push(`<${type}>${items.join('')}</${type}>`); continue;
    }
    const paragraph = [line.trim()]; i++;
    while (i < lines.length && lines[i].trim() && !/^(?:#{1,6}\s|\s*```|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i]) && !isTable(lines[i])) paragraph.push(lines[i++].trim());
    output.push(`<p>${inline(paragraph.join(' '), source)}</p>`);
  }
  return output.join('\n');
}
const figure = (file, alt, caption) => `<figure><img src="{{asset:${file}}}" alt="${escape(alt)}"><figcaption>${caption}</figcaption></figure>`;
const automation = [
  ['persianas', 'Persianas automatizadas'], ['puertas', 'Puertas automatizadas'], ['iluminacion', 'Iluminación inteligente'],
  ['cerraduras', 'Cerraduras inteligentes'], ['vidrio', 'Vidrio inteligente'], ['motores', 'Motores automatizados'], ['sensores', 'Sensores y control'],
];
const automationGallery = `<div class="gallery">${automation.map(([name, title]) => figure(`src/assets/catalogo/domotica/${name}-simulado.webp`, title, `<strong>${escape(title)}</strong><code>${name}-simulado.webp</code>`)).join('')}</div>`;
const projects = [
  ['luz-y-amplitud', 'Luz y amplitud en casa', 'Puerta corrediza residencial: marcos anteriores y propuesta en aluminio negro.'],
  ['transparencia', 'Transparencia en cada nivel', 'Barandal de hierro y propuesta de cristal templado en la misma escalera.'],
  ['nueva-mirada', 'Una nueva mirada al exterior', 'Fachada comercial anterior y propuesta de acceso en vidrio y aluminio negro.'],
];
const comparisons = projects.map(([folder, title, description]) => `<article class="comparison"><h3>${escape(title)}</h3><p class="small">${escape(description)} Proyecto simulado.</p><div class="two">${['antes', 'despues'].map(phase => figure(`src/assets/proyectos/${folder}/${phase}-simulado.webp`, `${phase === 'antes' ? 'Antes' : 'Después'}: ${title}, simulación`, phase === 'antes' ? 'ANTES · SIMULADO' : 'DESPUÉS · SIMULADO')).join('')}</div><div class="path">src/assets/proyectos/${folder}/</div></article>`).join('');
const variants = [
  ['src/assets/catalogo/ventanas/variantes/negro/batiente.png', 'Ventana · negro'],
  ['src/assets/catalogo/ventanas/variantes/blanco/batiente.png', 'Ventana · blanco'],
  ['src/assets/catalogo/espejos-led-touch/blanco-calido/allegro-circular.jpg', 'Espejo · blanco cálido'],
  ['src/assets/catalogo/espejos-led-touch/azul/allegro-circular.jpg', 'Espejo · azul'],
];
const variantExamples = `<div class="gallery">${variants.map(([file, label]) => figure(file, label, `<strong>${escape(label)}</strong>`)).join('')}</div>`;
const contentReadme = read('src/contenido/README.md');
const contentTable = contentReadme.split('\n').filter(line => /^\|/.test(line)).join('\n');
const categoryRows = categories.map(file => {
  const code = read(file);
  const title = code.match(/["']?TITULO["']?\s*:\s*["']([^"']+)["']/)?.[1] || path.basename(file, '.js');
  const count = [...code.matchAll(/["']?\bid["']?\s*:\s*["']([^"']+)["']/g)].length;
  return `<tr><td>${escape(title)}</td><td><code>${escape(path.basename(file))}</code></td><td>${count}</td></tr>`;
});
const categoryTable = `<table><thead><tr><th>Categoría</th><th>Archivo en categorias/</th><th>Productos</th></tr></thead><tbody>${categoryRows.join('')}</tbody></table>`;
const contact = read('src/contenido/general/sitio.js').split('export const PORTADA')[0].trim();
const contactCode = `<pre><code>${escape(contact)}</code></pre>`;
const carouselCode = `<pre><code>${escape(read('src/contenido/servicios/carrusel.json').trim())}</code></pre>`;
let content = read('docs/manual/contenido.html');
const replacements = { readmeCount: readmes.length, categoryCount: categories.length, imageCount: assets.length,
  contentMap: markdown(contentTable, 'src/contenido/README.md'), categoryTable, contactCode, carouselCode,
  automationGallery, projectComparisons: comparisons, variantExamples };
for (const [key, value] of Object.entries(replacements)) content = content.replaceAll(`{{${key}}}`, String(value));
const guides = sources.map(file => `<details id="${guideIds.get(file)}" data-guide data-title="${escape(file)}"><summary>${escape(file)}</summary><div class="guide-body"><p class="guide-source">Fuente: ${escape(file)}</p>${markdown(read(file), file)}</div></details>`).join('\n');
// Keep the complete inventory readable in the standalone manual, with no linked images.
const inventoryPath = 'src/contenido/imagenes/INVENTARIO.md';
let inventory = fs.existsSync(inventoryPath) ? markdown(read(inventoryPath), inventoryPath, 2) : '<p>Genera el inventario con npm run inventario:imagenes.</p>';
inventory = `<div class="inventory-wrap">${inventory}</div>`;
const headings = [...content.matchAll(/<section id="([^"]+)" data-title="([^"]+)">/g)].map(match => ({ id: match[1], title: match[2] }));
const toc = [...headings, { id: 'guias', title: 'Anexo A · Todas las guías' }, { id: 'inventario', title: 'Anexo B · Inventario de imágenes' }].map((item, i) => `<a href="#${item.id}"${i === 0 ? ' class="active"' : ''}>${String(i + 1).padStart(2, '0')} · ${escape(item.title)}</a>`).join('\n');
let html = read('docs/manual/plantilla.html');
for (const [key, value] of Object.entries({ content, toc, guides, inventory, logo: embedImage('src/assets/marca/cima.jpg'), readmeCount: readmes.length, imageCount: assets.length })) html = html.replaceAll(`{{${key}}}`, String(value));
html = html.replace(/\{\{asset:([^}]+)\}\}/g, (_, file) => embedImage(file));
if (/\{\{(?:asset:|content\}|toc\}|guides\})/.test(html)) throw Error('Marcadores del manual sin resolver');
// Make links to collapsed source guides expand before following the anchor.
html = html.replace("const guides=[...document.querySelectorAll('details[data-guide]')];", "document.querySelectorAll('[data-open-guide]').forEach(a=>a.addEventListener('click',()=>{const target=document.getElementById(a.hash.slice(1));if(target)target.open=true;}));\n  const guides=[...document.querySelectorAll('details[data-guide]')];");
fs.writeFileSync('docs/MANUAL_COMPLETO.html', html);
fs.writeFileSync('docs/manual/fuentes.json', JSON.stringify({ titulo: 'Manual completo de Cima Herrajes', fecha: '2026-10-23', readmes, documentos: documents, imagenesIntegradas: [...imageCache.keys()], categorias: categories.length, imagenesInventario: assets.length }, null, 2) + '\n');
console.log(`Manual generado: ${readmes.length} README + ${documents.length} documentos, ${imageCache.size} imágenes integradas, ${headings.length} capítulos. Tamaño: ${(Buffer.byteLength(html) / 1048576).toFixed(1)} MB.`);
