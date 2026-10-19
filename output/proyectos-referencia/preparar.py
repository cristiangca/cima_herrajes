from pathlib import Path
from PIL import Image, ImageOps
import json
root=Path.cwd()
spec=json.loads((root/'output/proyectos-referencia/imagenes.json').read_text(encoding='utf-8-sig'))
w,h=1200,900
collage=Image.new('RGB',(w*2,h*2))
for i,photo in enumerate(spec):
    im=Image.open(photo['path']).convert('RGB')
    collage.paste(ImageOps.fit(im,(w,h),method=Image.Resampling.LANCZOS),((i%2)*w,(i//2)*h))
collage.save(root/'output/proyectos-referencia/collage-proyectos.jpg',quality=95)
for i,photo in enumerate(spec):
    x,y=(i%2)*w,(i//2)*h
    collage.crop((x,y,x+w,y+h)).save(root/f"src/assets/proyectos-referencia/{photo['slug']}.jpg",quality=91,optimize=True)
print('Collage y cuatro recortes guardados.')
