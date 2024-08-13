import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import datetime
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

def get_all_links(base_url):
    urls = set()
    try:
        response = requests.get(base_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        for link in soup.find_all('a', href=True):
            url = urljoin(base_url, link['href'])
            # Validamos que el enlace pertenezca al dominio
            if urlparse(base_url).netloc == urlparse(url).netloc:
                urls.add(url.split('#')[0])  # Eliminamos anclas y duplicados
    except Exception as e:
        print(f"Error al acceder a {base_url}: {e}")
    return urls

def generate_sitemap(base_url, filename='../sitemap.xml'):
    urls = get_all_links(base_url)
    timestamp = datetime.datetime.now().isoformat()
    
    header = '<?xml version="1.0" encoding="UTF-8"?>\n'
    header += '<urlset\n'
    header += '      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    header += '      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
    header += '      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n'
    header += '            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n'
    
    body = ''
    for url in urls:
        body += f'  <url>\n'
        body += f'    <loc>{url}</loc>\n'
        body += f'    <lastmod>{timestamp}</lastmod>\n'
        body += f'    <priority>0.80</priority>\n'
        body += f'  </url>\n'
    
    footer = '</urlset>'
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(header + body + footer)
    
    print(f'Sitemap generado: {filename}')

# Ejemplo de uso
if __name__ == '__main__':
    base_url = os.getenv('BASE_URL')  # Obtenemos la URL desde el archivo .env
    if base_url:
        generate_sitemap(base_url)
    else:
        print("Error: No se encontró la variable de entorno BASE_URL")
