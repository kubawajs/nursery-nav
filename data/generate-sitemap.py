from datetime import date
import sys
import csv

domain = sys.argv[1]

# Generate the sitemap
print("Generating sitemap")
sitemap = "sitemap.xml"
current_date = date.today().strftime('%Y-%m-%d')
voivodeships = [
    'DOLNOŚLĄSKIE',
    'KUJAWSKO-POMORSKIE',
    'LUBELSKIE',
    'LUBUSKIE',
    'ŁÓDZKIE',
    'MAŁOPOLSKIE',
    'MAZOWIECKIE',
    'OPOLSKIE',
    'PODKARPACKIE',
    'PODLASKIE',
    'POMORSKIE',
    'ŚLĄSKIE',
    'ŚWIĘTOKRZYSKIE',
    'WARMIŃSKO-MAZURSKIE',
    'WIELKOPOLSKIE',
    'ZACHODNIOPOMORSKIE',
]
major_cities = [
    ('POZNAŃ', 'WIELKOPOLSKIE'),
    ('WROCŁAW', 'DOLNOŚLĄSKIE'),
    ('GDAŃSK', 'POMORSKIE'),
    ('KRAKÓW', 'MAŁOPOLSKIE'),
    ('WARSZAWA', 'MAZOWIECKIE'),
    ('KATOWICE', 'ŚLĄSKIE'),
    ('ŁÓDŹ', 'ŁÓDZKIE'),
    ('BIAŁYSTOK', 'PODLASKIE'),
    ('ZIELONA GÓRA', 'LUBUSKIE'),
    ('TARNÓW', 'MAŁOPOLSKIE'),
    ('RZESZÓW', 'PODKARPACKIE'),
    ('SIEDLCE', 'MAZOWIECKIE'),
    ('BYDGOSZCZ', 'KUJAWSKO-POMORSKIE'),
    ('LUBLIN', 'LUBELSIE'),
    ('OLSZTYN', 'WARMIŃSKO-MAZURSKIE'),
    ('ELBLĄG', 'WARMIŃSKO-MAZURSKIE'),
    ('TORUŃ', 'KUJAWSKO-POMORSKIE'),
    ('SŁUPSK', 'POMORSKIE'),
    ('PŁOCK', 'MAZOWIECKIE'),
    ('GDYNIA', 'POMORSKIE'),
    ('CZĘSTOCHOWA', 'ŚLĄSKIE'),
    ('RADOM', 'MAZOWIECKIE'),
    ('GLIWICE', 'ŚLĄSKIE'),
    ('ZABRZE', 'ŚLĄSKIE'),
]

# Load institutions file from args
institutions_file = sys.argv[2]

with open(institutions_file, 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    headers = next(reader)  # Read the header row
    institutions = []
    for row in reader:
        institutions.append(dict(zip(headers, row)))

with open(sitemap, 'w', encoding="utf8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    f.write(f'  <url>\n')
    f.write(f'    <loc>{domain}/</loc>\n')
    f.write(f'    <lastmod>{current_date}</lastmod>\n')
    f.write(f'  </url>\n')
    
    for voivodeship in voivodeships:
        f.write(f'  <url>\n')
        f.write(f'    <loc>{domain}/institutions/{voivodeship}</loc>\n')
        f.write(f'    <lastmod>{current_date}</lastmod>\n')
        f.write(f'  </url>\n')

    for city in major_cities:
        f.write(f'  <url>\n')
        f.write(f'    <loc>{domain}/institutions/{city[1]}/{city[0]}</loc>\n')
        f.write(f'    <lastmod>{current_date}</lastmod>\n')
        f.write(f'  </url>\n')

    for inst in institutions:
        if 'id' in inst and inst['id']:
            f.write(f'  <url>\n')
            f.write(f'    <loc>{domain}/institutions/details/{inst["id"].replace('/Z', '')}</loc>\n')
            f.write(f'    <lastmod>{current_date}</lastmod>\n')
            f.write(f'  </url>\n')
        else:
            print(f"Warning: No 'id' found for institution: {inst}")
    
    f.write('</urlset>')