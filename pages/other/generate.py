import os
import requests
import json
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

API_KEY = os.getenv('API_KEY')
CHANNEL_ID = os.getenv('CHANNEL_ID')
API_URL = f'https://www.googleapis.com/youtube/v3/search?key={API_KEY}&channelId={CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video'

def obtener_datos_videos():
    response = requests.get(API_URL)
    response.raise_for_status()  # Lanza un error si la solicitud falla
    return response.json()

def guardar_json(videos_data):
    with open('videos.json', 'w') as json_file:
        json.dump(videos_data, json_file, indent=4)

def descargar_cover(url, filename):
    response = requests.get(url)
    response.raise_for_status()  # Lanza un error si la solicitud falla
    with open(filename, 'wb') as file:
        file.write(response.content)

def generar_html(videos_data):
    # Leer la plantilla HTML desde el archivo
    with open('videos.templ.html', 'r') as template_file:
        html_template = template_file.read()

    # Generar el contenido de las tarjetas de video
    video_cards = ''
    for item in videos_data.get('items', []):
        video_id = item['id']['videoId']
        title = item['snippet']['title']
        description = item['snippet']['description']
        video_link = f'https://www.youtube.com/watch?v={video_id}'
        cover_url = item['snippet']['thumbnails']['high']['url']
        cover_filename = f'covers/{video_id}.jpg'

        # Descargar la portada del video
        descargar_cover(cover_url, cover_filename)

        # Añadir tarjeta del video
        video_card = f'''
        <div class="col-sm-12 col-md-4 col-lg-3 mt-5 video-card">
            <div class="card">
                <img src="{cover_filename}" id="{video_id}" class="card-img-top" alt="Cover del video" style="cursor: pointer;" onclick="window.open('{video_link}', '_blank')">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text" style="display:none;">{description}</p>
                </div>
            </div>
        </div>
'''
        video_cards += video_card

    # Reemplazar el marcador de posición en la plantilla
    html_content = html_template.replace('{video_cards}', video_cards)

    # Escribir el HTML final en un archivo
    with open('index.html', 'w') as html_file:
        html_file.write(html_content)

def main():
    try:
        videos_data = obtener_datos_videos()
        if not os.path.exists('covers'):
            os.makedirs('covers')
        guardar_json(videos_data)
        generar_html(videos_data)
        print("Se ha generado correctamente el archivo videos.json y videos.html")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
