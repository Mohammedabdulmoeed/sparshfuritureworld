"""Generate source-controlled, isolated demonstration illustrations, never model photography."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src/assets/electronics'
OUT.mkdir(parents=True, exist_ok=True)
# Each label describes the illustration, not a confirmed manufacturer specification.
rows = {
 'televisions': [('Slim Smart TV','Smart TV'),('Wide 4K-Style TV','4K-style television'),('Large-Screen TV','Large-screen television'),('Compact Television','Compact television'),('Curved-Screen TV','Curved television'),('Centre-Stand Smart TV','Smart TV'),('Silver-Frame Television','Television'),('Low-Profile Smart TV','Smart TV'),('Borderless-Style TV','Television'),('Pedestal-Stand TV','Television')],
 'refrigerators': [('Single-Door Refrigerator','Single door'),('Double-Door Refrigerator','Double door'),('Side-by-Side Refrigerator','Side-by-side'),('French-Door Refrigerator','French door'),('Compact Single-Door Refrigerator','Single door'),('Silver Double-Door Refrigerator','Double door'),('Dark Side-by-Side Refrigerator','Side-by-side'),('Bottom-Freezer Refrigerator','Bottom freezer'),('White Double-Door Refrigerator','Double door'),('Four-Door Refrigerator','Four door')],
 'washing-machines': [('White Front-Load Washer','Front load'),('Silver Front-Load Washer','Front load'),('Dark Front-Load Washer','Front load'),('White Top-Load Washer','Top load'),('Silver Top-Load Washer','Top load'),('Compact Top-Load Washer','Top load'),('Twin-Tub Washer','Semi-automatic'),('Blue Twin-Tub Washer','Semi-automatic'),('Compact Front-Load Washer','Front load'),('Wide Twin-Tub Washer','Semi-automatic')],
 'air-conditioners': [('White Split AC Indoor Unit','Split AC indoor unit'),('Slim Split AC Indoor Unit','Split AC indoor unit'),('Silver Split AC Indoor Unit','Split AC indoor unit'),('Dark Split AC Indoor Unit','Split AC indoor unit'),('Split AC Unit Set','Split AC indoor & outdoor set'),('Compact Split AC Unit Set','Split AC indoor & outdoor set'),('Window Air Conditioner','Window AC'),('Compact Window Air Conditioner','Window AC'),('Wide Window Air Conditioner','Window AC'),('Rounded Split AC Indoor Unit','Split AC indoor unit')],
 'water-heaters-air-coolers': [('Vertical Water Heater','Water heater'),('Compact Water Heater','Water heater'),('Horizontal Water Heater','Water heater'),('Slim Water Heater','Water heater'),('Square Water Heater','Water heater'),('Portable Air Cooler','Portable air cooler'),('Desert Air Cooler','Desert air cooler'),('Tower Air Cooler','Compact room air cooler'),('Compact Room Air Cooler','Compact room air cooler'),('Wide Desert Air Cooler','Desert air cooler')],
 'microwave-ovens': [('White Solo Microwave','Solo microwave'),('Silver Solo Microwave','Solo microwave'),('Dark Solo Microwave','Solo microwave'),('Compact Solo Microwave','Solo microwave'),('Silver Grill Microwave','Grill microwave'),('Black Grill Microwave','Grill microwave'),('White Convection Microwave','Convection microwave'),('Dark Convection Microwave','Convection microwave'),('Wide Convection Microwave','Convection microwave'),('Rounded Solo Microwave','Solo microwave')],
 'kitchen-chimneys': [('Pyramid Kitchen Chimney','Wall-mounted chimney'),('Curved-Glass Kitchen Chimney','Curved-glass chimney'),('Straight-Glass Kitchen Chimney','Straight-glass chimney'),('Dark Pyramid Kitchen Chimney','Wall-mounted chimney'),('Angled Kitchen Chimney','Angled extraction hood'),('Slim Straight-Glass Chimney','Straight-glass chimney'),('Wide Curved-Glass Chimney','Curved-glass chimney'),('Box Kitchen Extraction Hood','Box extraction hood'),('Compact Pyramid Chimney','Wall-mounted chimney'),('Island Kitchen Hood','Island extraction hood')],
 'gas-stoves': [('Two-Burner Glass Gas Stove','Two-burner glass top'),('Three-Burner Glass Gas Stove','Three-burner glass top'),('Four-Burner Glass Gas Stove','Four-burner glass top'),('Two-Burner Steel Gas Stove','Two-burner stainless steel'),('Three-Burner Steel Gas Stove','Three-burner stainless steel'),('Four-Burner Steel Gas Stove','Four-burner stainless steel'),('Compact Two-Burner Gas Stove','Two burner'),('Wide Three-Burner Gas Stove','Three burner'),('Square Four-Burner Gas Stove','Four burner'),('Slim Two-Burner Gas Stove','Two burner')],
 'mixer-grinders': [('White Mixer with Two Jars','Mixer grinder'),('Red Mixer with Three Jars','Mixer grinder'),('Silver Mixer with Two Jars','Mixer grinder'),('Compact Mixer with One Jar','Compact mixer grinder'),('Dark Mixer with Three Jars','Mixer grinder'),('Blue Mixer with Two Jars','Mixer grinder'),('Tall Mixer with Three Jars','Mixer grinder'),('Rounded Mixer with Two Jars','Mixer grinder'),('Green Mixer with One Jar','Compact mixer grinder'),('Wide Mixer with Three Jars','Mixer grinder')],
 'laptops-computers': [('Slim Silver Laptop','Laptop'),('Dark Business Laptop','Business laptop'),('Wide Gaming Laptop','Gaming laptop'),('Compact Laptop','Laptop'),('Light Business Laptop','Business laptop'),('Tower Desktop Computer','Desktop computer'),('Compact Desktop Computer','Desktop computer'),('Silver All-in-One Computer','All-in-one computer'),('Dark All-in-One Computer','All-in-one computer'),('Wide All-in-One Computer','All-in-one computer')],
 'tablets-smartphones': [('Dark Smartphone','Smartphone'),('Silver Smartphone','Smartphone'),('Blue Smartphone','Smartphone'),('Green Smartphone','Smartphone'),('Rounded Smartphone','Smartphone'),('Compact Smartphone','Smartphone'),('Silver Tablet','Tablet'),('Dark Tablet','Tablet'),('Compact Tablet','Tablet'),('Wide Tablet','Tablet')],
 'earbuds-headphones': [('White Earbuds with Case','True wireless earbuds'),('Dark Earbuds with Case','True wireless earbuds'),('Blue Earbuds with Case','True wireless earbuds'),('Compact Earbuds with Case','True wireless earbuds'),('Stemless Earbuds with Case','True wireless earbuds'),('Silver Over-Ear Headphones','Over-ear headphones'),('Dark Over-Ear Headphones','Wireless over-ear headphones'),('Blue On-Ear Headphones','On-ear headphones'),('White Wireless Headphones','Wireless headphones'),('Compact On-Ear Headphones','On-ear headphones')],
 'smartwatches': [('Round Watch with Dark Band','Round smartwatch'),('Round Watch with Steel Band','Round smartwatch'),('Round Watch with Blue Band','Round smartwatch'),('Round Watch with Green Band','Round smartwatch'),('Round Watch with Light Band','Round smartwatch'),('Square Watch with Dark Band','Square smartwatch'),('Square Watch with Blue Band','Square smartwatch'),('Square Watch with Rose Band','Square smartwatch'),('Square Watch with Steel Band','Square smartwatch'),('Square Watch with Light Band','Square smartwatch')],
 'cameras': [('Dark DSLR-Style Camera','DSLR-style camera'),('Wide DSLR-Style Camera','DSLR-style camera'),('Compact DSLR-Style Camera','DSLR-style camera'),('Silver Mirrorless-Style Camera','Mirrorless-style camera'),('Dark Mirrorless-Style Camera','Mirrorless-style camera'),('Retro Mirrorless-Style Camera','Mirrorless-style camera'),('Silver Compact Digital Camera','Compact digital camera'),('Dark Compact Digital Camera','Compact digital camera'),('Blue Compact Digital Camera','Compact digital camera'),('Rounded Compact Digital Camera','Compact digital camera')],
 'speakers-home-theatre': [('Compact Bluetooth Speaker','Portable Bluetooth speaker'),('Cylinder Bluetooth Speaker','Portable Bluetooth speaker'),('Wide Bluetooth Speaker','Portable Bluetooth speaker'),('Tall Party Speaker','Party speaker'),('Twin-Driver Party Speaker','Party speaker'),('Slim Soundbar','Soundbar'),('Soundbar with Subwoofer','Soundbar system'),('Home Theatre Speaker Set','Home theatre system'),('Compact Multimedia Speakers','Multimedia speakers'),('Tall Home Theatre Speaker Set','Home theatre system')],
 'projectors': [('White Home Cinema Projector','Home cinema projector'),('Dark Home Cinema Projector','Home cinema projector'),('Wide Home Cinema Projector','Home cinema projector'),('Silver Presentation Projector','Presentation projector'),('Compact Presentation Projector','Presentation projector'),('Wide Presentation Projector','Presentation projector'),('Portable Cube Projector','Portable projector'),('Compact Portable Projector','Portable projector'),('Rounded Portable Projector','Portable projector'),('Tower Portable Projector','Portable projector')],
 'routers-networking': [('Two-Antenna Wi-Fi Router','Wi-Fi router'),('Four-Antenna Wi-Fi Router','Wi-Fi router'),('Six-Antenna Wi-Fi Router','Multi-antenna router'),('Compact Wi-Fi Router','Compact router'),('Wide Wi-Fi Router','Wi-Fi router'),('Cylinder Mesh Node','Mesh networking device'),('Cube Mesh Node','Mesh networking device'),('Twin Mesh Nodes','Mesh networking devices'),('Round Access Point','Networking access point'),('Square Access Point','Networking access point')],
 'led-lighting': [('Classic LED Bulb','LED bulb'),('Globe LED Bulb','LED bulb'),('Candle LED Bulb','LED bulb'),('Wide LED Bulb','LED bulb'),('Square LED Panel','LED panel light'),('Round LED Panel','LED panel light'),('Recessed LED Downlight','LED downlight'),('Compact LED Downlight','LED downlight'),('LED Tube Light','LED tube light'),('Twin LED Tube Lights','LED tube lights')],
 'security-cameras': [('Indoor Pan-and-Tilt Camera','Indoor pan-and-tilt security camera'),('Compact Indoor Camera','Indoor Wi-Fi security camera'),('Outdoor Bullet Camera','Outdoor bullet security camera'),('Long Outdoor Bullet Camera','Outdoor bullet security camera'),('Dome Surveillance Camera','Dome security camera'),('Turret Surveillance Camera','Turret security camera'),('Indoor Wi-Fi Camera','Indoor Wi-Fi security camera'),('Outdoor PTZ Camera','Outdoor pan-and-tilt security camera'),('Dark Dome Surveillance Camera','Dome security camera'),('Wide Bullet Security Camera','Outdoor bullet security camera')],
 'set-top-boxes-accessories': [('Compact Set-Top Box','Television set-top box'),('Wide Set-Top Box','Television set-top box'),('Silver Set-Top Box','Television set-top box'),('Square Streaming Media Box','Streaming media box'),('Rounded Streaming Media Box','Streaming media box'),('Compact TV Remote','TV remote control'),('Long TV Remote','TV remote control'),('Streaming Remote Control','Streaming remote control'),('HDMI Cable','HDMI accessory'),('HDMI Adapter','HDMI accessory')],
}
# Shared studio shading, detailed surfaces and consistent generous framing.
def svg(cat,i):
    colors=['#f6f7f7','#c6cdd0','#2e343b','#eef0ee','#93a9b5','#3d5864','#f1f2f4','#aeb3b6','#496758','#d9c0b5']
    body=colors[i]; dark='#222930'; metal='#adb7bc'
    def rect(x,y,w,h,r=8,fill='url(#body)',stroke='#77838b',sw=2):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
    def circle(x,y,r,fill=dark,stroke='#7c8a94',sw=2):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
    def path(d,fill='none',stroke=dark,sw=3):return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
    def line(x,y,x2,y2,stroke='#78838b',sw=2):return path(f'M{x} {y}L{x2} {y2}',stroke=stroke,sw=sw)
    def grille(x,y,w,h,n=12):return ''.join(line(x,y+j*h/n,x+w,y+j*h/n,sw=2) for j in range(n))
    def lens(x,y,r):return circle(x,y,r,'url(#lens)')+circle(x,y,r*.77,'#12252d')+circle(x,y,r*.52,'#315361')+circle(x-r*.2,y-r*.23,r*.17,'#a2c9d0','none')+circle(x,y,r*.28,'#182d3b')
    def screen(x,y,w,h):return rect(x,y,w,h,3,'url(#screen)',dark)+path(f'M{x} {y+h*.7} Q{x+w*.25} {y+h*.35} {x+w*.5} {y+h*.65} T{x+w} {y+h*.45} L{x+w} {y+h} L{x} {y+h}Z','#598285','none',0)+path(f'M{x} {y+h*.82} Q{x+w*.35} {y+h*.52} {x+w*.7} {y+h*.84} T{x+w} {y+h*.7} L{x+w} {y+h} L{x} {y+h}Z','#b7c7bb','none',0)
    s=''
    if cat=='televisions':
        w=[470,530,560,380,510,480,460,520,550,440][i]; x=(800-w)/2;y=220;h=w*.58
        s=rect(x,y,w,h,8,body)+screen(x+9,y+9,w-18,h-18)
        s+=path(f'M{x+70} {y+h}l-25 42h70 M{x+w-70} {y+h}l25 42h-70',stroke=dark,sw=8) if i not in [5,9] else rect(386,y+h,28,42,3,metal)+rect(330,y+h+36,140,10,4,dark)
        if i==4:s+=path(f'M{x+7} {y+8} Q400 {y+28} {x+w-7} {y+8}',stroke='#c1d7d9')
    elif cat=='refrigerators':
        w=245 if i in [0,4] else 330;x=(800-w)/2;y=120;h=490
        s=rect(x,y,w,h,14)
        if i in [0,4]:s+=rect(x+w-30,y+90,8,160,4,metal)
        elif i in [2,3,6,9]:s+=line(400,y+4,400,y+h-5)+rect(380,y+75,7,160,3,metal)+rect(413,y+75,7,160,3,metal)
        else:s+=line(x,y+145,x+w,y+145)+rect(x+w-28,y+40,7,75,3,metal)+rect(x+w-28,y+185,7,170,3,metal)
        if i in [3,7,9]:s+=line(x,y+355,x+w,y+355)+rect(x+70,y+374,w-140,7,3,metal)
        s+=rect(x+14,y+h,30,10,2,dark)+rect(x+w-44,y+h,30,10,2,dark)
    elif cat=='washing-machines':
        if i in [6,7,9]:
            s=rect(175,210,450,360,14)+rect(187,214,250,65,9,'#b2c8d0')+rect(451,214,160,65,9,'#95b1be')+line(445,292,445,550)+circle(240,248,12,metal)+circle(500,248,12,metal)+grille(195,478,220,45,8)
        else:
            w=300 if i!=8 else 270;x=(800-w)/2;s=rect(x,175,w,420,15)+rect(x+16,190,115,35,4,'#e6eaeb')+rect(x+w-90,190,72,28,4,dark)+circle(x+w-120,207,16,metal)
            if i in [3,4,5]:s+=rect(x+22,246,w-44,95,9,'#667c85')+rect(x+37,260,w-74,65,7,'#a1bbc4')+line(x,347,x+w,347)
            else:s+=circle(400,405,112,metal)+lens(400,405,97)+path('M461 342Q496 405 459 466',stroke='#d2e2e7',sw=6)
            s+=rect(x+17,590,26,10,3,dark)+rect(x+w-43,590,26,10,3,dark)
    elif cat=='air-conditioners':
        if i in [6,7,8]:
            s=rect(185,235,430,245,8)+rect(205,255,275,145,3,'#dae0e2')+grille(218,270,247,122,14)+rect(505,260,85,105,3,dark)+circle(545,405,17,metal)+grille(207,425,260,34,5)
        else:
            w=560 if i!=1 else 590;x=(800-w)/2;s=rect(x,210,w,165,25)+line(x+20,275,x+w-20,275,'#cad1d3')+rect(x+24,319,w-48,34,6,dark)+grille(x+40,324,w-80,24,5)+circle(x+w-55,293,3,'#85c5b9','none')
            if i in [4,5]:s+=rect(290,428,270,185,9)+circle(385,518,72,'#d7dfe0')+''.join(line(320,460+j*10,450,460+j*10,'#74848c') for j in range(12))+rect(480,450,54,133,4,'#dce1e2')
    elif cat=='water-heaters-air-coolers':
        if i<5:
            w=250 if i!=3 else 190;h=340 if i!=2 else 235;x=(800-w)/2;y=190
            s=rect(x,y,w,h,45 if i!=4 else 18)+path(f'M{x+15} {y+65}Q400 {y+105} {x+w-15} {y+65}',stroke='#d0d8db')+circle(400,y+h-75,25,metal)+circle(400,y+h-75,11,dark)+line(360,y+h,360,y+h+35,'#b25653',9)+line(440,y+h,440,y+h+35,'#4c8096',9)
        else:
            w=[0,0,0,0,0,265,330,190,230,355][i];x=(800-w)/2;s=rect(x,175,w,405,20)+rect(x+20,200,w-40,54,6,'#dce2e4')+circle(400,225,12,dark)+rect(x+23,275,w-46,200,8,'#34434a')+grille(x+32,290,w-64,167,16)+rect(x+25,505,w-50,48,5,'#9cb9c2')+circle(x+35,590,13,dark)+circle(x+w-35,590,13,dark)
    elif cat=='microwave-ovens':
        w=470 if i!=3 else 390;x=(800-w)/2;s=rect(x,240,w,285,16)+rect(x+18,260,w-132,242,8,dark)+rect(x+34,278,w-165,205,3,'#33454b')+rect(x+w-110,278,70,45,3,dark)+rect(x+w-140,290,10,173,4,metal)+circle(x+w-74,368,23,metal)+circle(x+w-74,432,16,metal)+rect(x+27,527,34,9,2,dark)+rect(x+w-61,527,34,9,2,dark)+grille(x+46,440,w-190,30,5)
    elif cat=='kitchen-chimneys':
        s=rect(335,125,130,250,3)
        if i in [1,6]:s+=path('M175 425Q400 350 625 425L610 450Q400 385 190 450Z','#344950','#758890',2)+rect(285,405,230,64,5)
        elif i in [2,5,9]:s+=rect(170,415,460,18,4,'#63757c')+rect(265,355,270,64,5)
        elif i==4:s+=path('M260 305L560 350L525 520L225 475Z',dark,metal,3)+rect(275,360,235,40,6,'#53616a')
        elif i==7:s+=rect(205,355,390,122,4)
        else:s+=path('M335 350H465L610 455H190Z','url(#body)','#7b8991',2)+rect(190,455,420,35,3)
        s+=rect(345,451,110,10,2,dark)+''.join(circle(375+j*14,456,3,'#c7d5d8','none') for j in range(4))
    elif cat=='gas-stoves':
        count=[2,3,4,2,3,4,2,3,4,2][i];s=rect(150,240,500,280,17,'#b6c0c4' if i in [3,4,5] else '#253239')+rect(150,500,500,42,7,metal)
        positions=[(270,360),(530,360)] if count==2 else [(260,350),(400,365),(545,350)] if count==3 else [(270,315),(530,315),(270,435),(530,435)]
        for x,y in positions:s+=circle(x,y,57,'#10181e')+circle(x,y,35,'#6e7679')+circle(x,y,23,'#222930')+path(f'M{x-72} {y}H{x-40}M{x+40} {y}H{x+72}M{x} {y-70}V{y-40}M{x} {y+40}V{y+70}',stroke='#0e171c',sw=7)
        s+=''.join(circle(340+j*48,525,12,dark) for j in range(count))
    elif cat=='mixer-grinders':
        count=[2,3,2,1,3,2,3,2,1,3][i];s=path('M265 360H400L430 570H230Z','url(#body)','#7c8a92',2)+circle(330,492,30,metal)+line(330,478,330,502,dark,4)+rect(250,574,30,8,2,dark)+rect(380,574,30,8,2,dark)
        def jar(x,y,w,h):return rect(x,y,w,h,12,'url(#steel)')+rect(x-8,y-13,w+16,19,7,dark)+rect(x+w-2,y+25,35,h*.65,12,'none',dark,7)+rect(x+15,y+h,w-30,20,4,dark)
        s+=jar(258,220,140,140)
        if count>1:s+=jar(478,360,106,157)
        if count>2:s+=jar(560,257,86,89)
    elif cat=='laptops-computers':
        if i<5:
            s=rect(175,220,450,275,12)+screen(189,235,422,246)+path('M175 495H625L675 545H125Z','url(#steel)','#71828b',2)+rect(125,545,550,12,4,metal)+rect(335,520,130,18,4,'#9aa7ad')+''.join(line(210,500+j*5,590,500+j*5,'#6b7c85') for j in range(3))
        else:
            s=rect(180,205,400,275,9)+screen(192,216,376,249)+rect(365,480,32,73,3,metal)+rect(308,547,148,12,4,metal)
            if i in [5,6]:s+=rect(605,262,110,295,9)+rect(620,277,80,33,3,dark)+circle(660,335,8,metal)+grille(625,460,68,68,9)
    elif cat=='tablets-smartphones':
        w=210 if i<6 else 335;h=405 if i<6 else 435;x=(800-w)/2;y=150;s=rect(x,y,w,h,28)+screen(x+9,y+12,w-18,h-24)+rect(365,y+18,70,12,6,dark)+circle(x+w-23,y+24,4,'#8ca4ac','none')+line(x+w+2,y+95,x+w+2,y+140,metal,4)
    elif cat=='earbuds-headphones':
        if i<5:
            s=rect(275,387,250,155,55)+path('M282 423Q400 463 518 423',stroke='#84949a')+circle(400,505,4,'#8ab3a8','none')
            for x in [325,475]:s+=circle(x,265,37,'url(#body)')+circle(x,265,17,dark)+rect(x-12,280,24,78 if i!=4 else 35,10)+circle(x+8,244,5,'#9eabb0','none')
        else:
            s=path('M255 385V325C255 130 545 130 545 325V385',stroke=dark,sw=32)+path('M255 326C255 155 545 155 545 326',stroke=body,sw=19)+rect(221,341,78,167 if i not in [7,9] else 130,32)+rect(501,341,78,167 if i not in [7,9] else 130,32)+rect(282,351,26,146,12,dark)+rect(492,351,26,146,12,dark)
    elif cat=='smartwatches':
        band=['#25313a','#a7afb3','#466f8e','#547764','#d5d5c8','#25313a','#466f8e','#cdaca7','#a7afb3','#d5d5c8'][i];s=rect(352,96,96,505,32,band)+''.join(rect(360,120+j*32,80,14,3,band,'#76838a',1) for j in range(14))
        s+=circle(400,348,126,'url(#steel)')+circle(400,348,111,dark) if i<5 else rect(290,227,220,246,48,'url(#steel)')+rect(303,240,194,220,40,dark)
        s+=circle(514 if i<5 else 520,340,10,metal)+path('M400 277V350L447 380',stroke='#e1e9e7',sw=7)+circle(400,350,8,'#709c9f')+path('M351 420H449',stroke='#75959a',sw=4)
    elif cat=='cameras':
        w=400 if i<6 else 350;x=(800-w)/2;s=rect(x,265,w,250 if i<6 else 205,24)+rect(x+15,283,68,202 if i<6 else 160,18,dark)+rect(x+110,233,140,53,7)+rect(x+25,246,48,25,5,dark)+lens(425,385,103 if i<6 else 73)+rect(x+w-62,281,36,22,4,'#d4e0e3')+circle(x+w-42,328,7,dark)
    elif cat=='speakers-home-theatre':
        if i in [0,1,2]:
            s=rect(245,255,310,255,85 if i==1 else 25)+grille(270,280,260,180,30)+path('M325 248Q400 205 475 248',stroke=dark,sw=10)+circle(400,475,6,metal)
        elif i in [3,4]:s=rect(285,155,230,445,22)+circle(400,300,86,'#17242a')+lens(400,300,64)+circle(400,490,86,'#17242a')+lens(400,490,64)+rect(328,177,144,37,4,dark)
        elif i in [5,6]:
            s=rect(140,350,520,88,30,dark)+grille(170,367,450,52,10)
            if i==6:s+=rect(475,455,140,175,9,dark)+circle(545,535,52,'#34454c')
        else:
            for x,y,w,h in [(175,200,105,370),(520,200,105,370),(320,345,160,240)]:s+=rect(x,y,w,h,9,dark)+circle(x+w/2,y+h*.3,w*.35,'#45535a')+circle(x+w/2,y+h*.72,w*.35,'#45535a')
    elif cat=='projectors':
        w=415 if i<6 else 235;h=240 if i<6 else 290;x=(800-w)/2;s=rect(x,250,w,h,28)+lens(x+w*.3,360,76 if i<6 else 60)+grille(x+w*.6,290,w*.31,90,12)+rect(x+30,235,w-60,20,8,metal)+circle(x+w-35,450,7,'#89b7af','none')
        if i>=6:s+=path(f'M{x+25} 525Q400 620 {x+w-25} 525',stroke=metal,sw=14)
    elif cat=='routers-networking':
        if i<5:
            n=[2,4,6,2,4][i];s=rect(215,365,370,145,20)+grille(238,385,310,55,8)+''.join(circle(275+j*27,475,3,'#8fc8b5','none') for j in range(5))
            for j in range(n):x=230+j*340/(n-1);s+=path(f'M{x} 372L{x+(j-(n-1)/2)*12} 190',stroke=dark,sw=14)
        elif i in [5,6,7]:
            s=rect(315,200,170,335,70 if i==5 else 22)+circle(400,478,4,'#8dc5b3','none')+line(345,505,455,505)
            if i==7:s+=rect(505,290,130,250,22)+circle(570,495,4,'#8dc5b3','none')
        else:s=circle(400,370,180,'url(#body)')+circle(400,370,140,'none','#c9d1d4')+circle(400,390,5,'#82bdae','none') if i==8 else rect(230,220,340,300,30)+rect(267,253,266,230,20,'none','#c5cdd0')+circle(400,450,5,'#82bdae','none')
    elif cat=='led-lighting':
        if i<4:
            s=path('M350 432C342 370 292 342 292 278C292 147 508 147 508 278C508 342 458 370 450 432Z','#eef2ed','#a2b0b5',3)+rect(350,420,100,92,8,'url(#steel)')+grille(356,438,88,57,7)+rect(365,512,70,20,5,dark)
            if i==2:s=path('M350 432C330 312 365 233 400 140C435 233 470 312 450 432Z','#eff3ed','#a2b0b5',3)+rect(350,420,100,92,8,'url(#steel)')+grille(356,438,88,57,7)
        elif i in [4,5]:s=rect(205,190,390,390,8,'#b9c4c8')+rect(222,207,356,356,3,'#f1f5ef') if i==4 else circle(400,370,190,'#b9c4c8')+circle(400,370,173,'#f1f5ef')
        elif i in [6,7]:s=circle(400,365,165,'url(#steel)')+circle(400,365,129,'#eef3e9')+circle(400,365,109,'#e6eddf')+line(210,355,239,355,metal,10)+line(561,355,590,355,metal,10)
        else:
            s=rect(145,335,510,66,30,'#f3f7f2')+rect(145,335,42,66,8,metal)+rect(613,335,42,66,8,metal)
            if i==9:s+=rect(145,440,510,66,30,'#f3f7f2')+rect(145,440,42,66,8,metal)+rect(613,440,42,66,8,metal)
    elif cat=='security-cameras':
        if i in [2,3,9]:
            s=rect(534,300,38,150,8)+path('M540 375H482',stroke=metal,sw=20)+path('M230 250H480L510 300V440L475 470H230Z','url(#body)','#798b94',3)+path('M200 235H480L510 275H200Z',body,'#798b94',2)+lens(240,355,95)+rect(325,294,130,125,8,'#dce3e4')
        elif i in [4,5,8]:
            s=rect(250,235,300,72,28)+path('M255 300C255 510 545 510 545 300Z','#60717b','#87969d',3)+lens(400,365,67)+path('M280 320Q300 448 400 466',stroke='#c9d8da',sw=7)
        else:
            s=rect(300,452,200,95,40)+circle(400,339,115,'url(#body)')+rect(321,270,158,142,70,dark)+lens(400,339,53)+circle(447,295,7,'#aeb9bf','none')+rect(320,541,160,12,5,metal)
            if i==7:s+=path('M510 330H570V230',stroke=metal,sw=18)+rect(545,199,52,22,5)
    else:
        if i<5:s=rect(245,275,310,190,26 if i==4 else 12)+rect(260,395,280,45,7,dark)+circle(290,419,4,'#8fc5b6','none')+rect(365,414,120,8,2,'#708e96')+grille(275,297,248,50,7)
        elif i in [5,6,7]:
            s=rect(330,145,140,440,36,dark)+circle(400,234,42,'#697b84')+circle(400,234,20,dark)+circle(400,183,10,'#a6b6bc')+''.join(circle(368+(j%3)*32,321+(j//3)*42,9,'#76868d') for j in range(12))+rect(360,515,80,18,8,'#869ca5')
        elif i==8:s=path('M295 285C150 275 165 525 400 525C640 525 640 230 510 245',stroke=dark,sw=18)+rect(265,200,65,100,8,dark)+rect(277,170,41,35,3,metal)+rect(478,170,65,100,8,dark)+rect(490,140,41,35,3,metal)
        else:s=rect(285,270,230,150,15,dark)+rect(305,292,72,92,5,metal)+rect(316,308,50,60,3,dark)+rect(440,292,50,92,4,metal)+rect(515,308,62,70,6,dark)+rect(577,320,44,46,3,metal)
    # Variations are actual distinct source illustrations, not duplicated assignments.
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img"><title>{rows[cat][i][0]} — demonstration illustration</title><defs><linearGradient id="body" x1="0" x2="1" y1="0" y2=".5"><stop stop-color="{body}"/><stop offset=".48" stop-color="{body}"/><stop offset="1" stop-color="{metal}"/></linearGradient><linearGradient id="steel"><stop stop-color="#6f818b"/><stop offset=".28" stop-color="#e0e6e7"/><stop offset=".6" stop-color="#afbdc2"/><stop offset="1" stop-color="#6f818b"/></linearGradient><linearGradient id="lens" x2="1" y2="1"><stop stop-color="#879ba6"/><stop offset=".4" stop-color="#263d48"/><stop offset="1" stop-color="#0f1e25"/></linearGradient><linearGradient id="screen" x2=".2" y2="1"><stop stop-color="#365a6a"/><stop offset="1" stop-color="#9bb8b7"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#36474d" flood-opacity=".17"/></filter></defs><rect width="800" height="800" fill="#f5f6f4"/><ellipse cx="400" cy="650" rx="230" ry="17" fill="#e3e7e4"/><g filter="url(#shadow)">{s}</g></svg>'''
entries=[]
for cat,items in rows.items():
 for i,(name,sub) in enumerate(items):
    filename=f'{cat}-{i+1:02}.svg'
    (OUT/filename).write_text(svg(cat,i))
    entries.append({'id':f'demo-{cat}-{i+1:02}','slug':f'demo-{cat}-{i+1:02}','name':name,'department':'electronics','category':cat,'subcategory':sub,'demonstration':True,'description':f'Demonstration illustration of a {name.lower()}. This is not a confirmed showroom model or inventory listing. Ask us about actual {sub.lower()} options, current prices and availability.','asset':filename})
# Editable entries feed the existing products.ts catalogue.
(ROOT/'src/data/electronics.entries.json').write_text(json.dumps(entries,indent=2)+'\n')
print(f'Created {len(entries)} distinct demonstration entries and SVG source illustrations.')
