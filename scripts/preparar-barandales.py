"""Empaqueta variantes ya generadas y compone una hoja de comparación sin retocar fotos."""
import json
from pathlib import Path
from shutil import copy2
from PIL import Image, ImageOps, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
registros = json.loads((root / 'output/variantes-barandales.json').read_text(encoding='utf-8'))
originales = ['1-con-anclas.webp', '2-con-chapetones.webp', '3-con-herraje-y-pasamanos.webp', '4-con-minipostes-y-pasamanos.webp', '6-con-pinzas-y-pasamanos.webp', '7-con-postes-y-pasamanos.webp', '14-de-balcon.webp']
titulos = ['Anclas', 'Chapetones', 'Herraje y pasamanos', 'Minipostes', 'Pinzas', 'Postes', 'Balcón']
destino = root / 'src/assets/catalogo/barandales/variantes'
for carpeta in ['negro', 'plateado', 'collages']:
    (destino / carpeta).mkdir(parents=True, exist_ok=True)
hoja = Image.new('RGB', (1440, 260 + 7 * 640), '#ffffff')
draw = ImageDraw.Draw(hoja)
fuente = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 28)
titulo = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 42)
draw.text((60, 44), 'BARANDALES · HERRAJES', fill='#0f172a', font=titulo)
draw.text((60, 112), 'Comparación de acabados · Plateado original / Negro simulado', fill='#475569', font=fuente)
draw.text((230, 190), 'PLATEADO', fill='#0f172a', font=fuente)
draw.text((960, 190), 'NEGRO', fill='#0f172a', font=fuente)
for i, (item, original, nombre) in enumerate(zip(registros, originales, titulos)):
    base = root / 'src/assets/catalogo/barandales' / original
    copy2(base, destino / 'plateado' / (item['slug'] + '.webp'))
    negro = Image.open(item['path']).convert('RGB')
    negro.save(destino / 'negro' / (item['slug'] + '.webp'), quality=93, method=6)
    for col, foto in enumerate([Image.open(base).convert('RGB'), negro]):
        mini = ImageOps.contain(foto, (650, 570), Image.Resampling.LANCZOS)
        x = 40 + col * 710 + (650 - mini.width) // 2
        y = 270 + i * 640 + (570 - mini.height) // 2
        hoja.paste(mini, (x, y))
    draw.text((60, 850 + i * 640), nombre, fill='#0f172a', font=fuente)
hoja.save(destino / 'collages/comparativa-herrajes.jpg', quality=94)
print('7 pares separados y collage guardados en', destino)
