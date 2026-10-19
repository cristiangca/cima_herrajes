from pathlib import Path
from PIL import Image, ImageOps
import urllib.request, io, re, json
root=Path.cwd()
source=(root/'src/contenido/catalogo.js').read_text(encoding='utf-8')
urls=re.findall(r'https://blir.com.mx/assets/img/shop/individuales/mamparas/[^"\s]+',source)
folder=root/'src/assets/canceles-bano'
folder.mkdir(parents=True,exist_ok=True)
report=[]
for url in urls:
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept':'image/avif,image/webp,image/*,*/*;q=0.8','Referer':'https://blir.com.mx/'})
    with urllib.request.urlopen(req,timeout=40) as r: data=r.read()
    original=ImageOps.exif_transpose(Image.open(io.BytesIO(data)))
    name=Path(url).stem
    sizes={}
    for suffix,limit,quality in [('tarjeta',640,78),('detalle',1400,84)]:
        im=original.copy()
        im.thumbnail((limit,limit),Image.Resampling.LANCZOS)
        target=folder/f'{name}-{suffix}.webp'
        im.save(target,'WEBP',quality=quality,method=6)
        sizes[suffix]={'bytes':target.stat().st_size,'size':im.size}
    report.append({'url':url,'original_bytes':len(data),'original_size':original.size,**sizes})
    print(name,round(len(data)/1024),'KB ->',round(sizes['tarjeta']['bytes']/1024),'KB /',round(sizes['detalle']['bytes']/1024),'KB',flush=True)
(root/'output/optimizacion-canceles/informe.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
