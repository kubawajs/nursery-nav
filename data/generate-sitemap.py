from datetime import date
import sys

domain = sys.argv[1]
number_of_institutions = int(sys.argv[2])

# Generate the sitemap
print("Generating sitemap")
sitemap = "sitemap.xml"
current_date = date.today().strftime('%Y-%m-%d')

with open(sitemap, 'w', encoding="utf8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    f.write(f'  <url>\n')
    f.write(f'    <loc>{domain}/</loc>\n')
    f.write(f'    <lastmod>{current_date}</lastmod>\n')
    f.write(f'  </url>\n')
    
    for i in range(1, number_of_institutions + 1):
        f.write(f'  <url>\n')
        f.write(f'    <loc>{domain}/institutions/details/{i}</loc>\n')
        f.write(f'    <lastmod>{current_date}</lastmod>\n')
        f.write(f'  </url>\n')
    
    f.write('</urlset>')