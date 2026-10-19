from pathlib import Path
from PIL import Image
import json, zipfile
root=Path(r'C:/Users/invid/Cima_herrajes/cima_herrajes/output/espejos-led')
models=['allegro','halo','resplandor','lumin','allegro-circular','ovalado-halo','ovalado-resplandor','ovalado-allegro','halo-circular','resplandor-circular']
sheets=json.loads((root/'laminas.json').read_text(encoding='utf-8-sig'))
for sheet in sheets:
    im=Image.open(sheet['path']).convert('RGB')
    sx,sy=im.width/1068,im.height/509
    folder=root/'imagenes'/sheet['slug']
    folder.mkdir(parents=True,exist_ok=True)
    for i,model in enumerate(models):
        x=[21,230,438,647,855][i%5]
        y=[25,269][i//5]
        box=(round((x+2)*sx),round((y+2)*sy),round((x+187)*sx),round((y+187)*sy))
        im.crop(box).save(folder/(model+'.jpg'),quality=95,subsampling=0)
with zipfile.ZipFile(root/'espejos-50-imagenes.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for file in sorted((root/'imagenes').glob('*/*.jpg')):
        archive.write(file,file.relative_to(root/'imagenes'))
print('Imagenes:',len(list((root/'imagenes').glob('*/*.jpg'))))
print('ZIP:',root/'espejos-50-imagenes.zip')
