from pathlib import Path
from pypdf import PdfReader
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).resolve().parents[1]
reader = PdfReader(r'D:\CUBICLE PRO\BROUCHER\Cubicle-Pro-Complete-Washroom-Solutions-Brochure.pdf')
raw = root / 'asset-sources'
raw.mkdir(exist_ok=True)
mapping = {
 'titan-black': (4,0), 'nova': (4,1), 'supernova': (5,0), 'supernova-plus': (5,0),
 'base-box-a': (6,0), 'base-box-b': (6,1), 'suspended-a': (7,0), 'suspended-b': (7,1),
 'pro-doors': (8,0), 'custom': (8,0), 'junior-series': (9,0), 'modesty-panels': (10,0),
 'shape-library': (11,0), 'hpl-lockers': (12,0), 'hero': (1,0), 'logo': (0,1)
}
for name,(page,index) in mapping.items():
 im=reader.pages[page].images[index].image.convert('RGB')
 im.save(raw / f'{name}.png')
 target=root / 'public' / 'images' / ('brand' if name=='logo' else 'products')
 target.mkdir(parents=True,exist_ok=True)
 if name=='logo':
  im.thumbnail((420,240)); im.save(target/'logo.png')
 else:
  im.save(target/f'{name}.webp','WEBP',quality=85,method=6)
names=['base-box-a','base-box-b','suspended-a','suspended-b','logo','hero']
sheet=Image.new('RGB',(1000,1100),'white')
draw=ImageDraw.Draw(sheet)
for i,name in enumerate(names):
 im=ImageOps.contain(Image.open(raw/f'{name}.png'),(480,320))
 x=(i%2)*500; y=(i//2)*360
 sheet.paste(im,(x,y+25));draw.text((x+8,y+5),name,fill='black')
sheet.save(raw/'review.jpg')
print('Extracted brochure images; mapping review: asset-sources/review.jpg')
