# Alex Cultural — Artist Website

Web de artista construida con React + Vite, con una estética negra, blanca y naranja.

## Incluye

- Navbar con Instagram, TikTok y YouTube.
- Hero/portada.
- Carrusel automático de 3 imágenes.
- Reproductor de música con playlist.
- Sección de vídeos de YouTube.
- Diseño responsive para móvil.
- Backend Flask básico preparado para una futura API.

## 1. Instalar y ejecutar

Necesitas Node.js instalado.

```bash
npm install
npm run dev
```

Después abre la dirección que te indique Vite, normalmente:

http://localhost:5173

## 2. Cambiar tus fotografías

Sustituye estos archivos:

- `public/images/slide-1.svg`
- `public/images/slide-2.svg`
- `public/images/slide-3.svg`

Puedes poner JPG/PNG y cambiar las rutas en `src/data/content.js`.

Para la foto principal del Hero, modifica el bloque `.hero-art` de `src/App.jsx` y coloca tu fotografía.

## 3. Subir tus canciones

Pon tus archivos `.mp3` en:

`public/audio/`

Después edita `src/data/content.js`.

Ejemplo:

```js
{
  title: "Mi canción",
  artist: "Alex Cultural",
  duration: "03:45",
  src: "/audio/mi-cancion.mp3"
}
```

## 4. Poner tus vídeos de YouTube

En `src/data/content.js`, cambia `youtubeId` por el ID real de cada vídeo.

Ejemplo:

```js
{
  title: "Mi nuevo videoclip",
  duration: "04:12",
  youtubeId: "ID_DEL_VIDEO"
}
```

El ID aparece en la URL de YouTube:

`youtube.com/watch?v=ABC123`

El ID sería `ABC123`.

## 5. Cambiar redes sociales

En `src/data/content.js` cambia:

```js
instagram: "https://www.instagram.com/",
tiktok: "https://www.tiktok.com/",
youtube: "https://www.youtube.com/",
```

por tus perfiles reales.

## 6. Publicarlo gratis con GitHub + Vercel

Crea un repositorio en GitHub y desde esta carpeta:

```bash
git init
git add .
git commit -m "Initial artist website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/alex-cultural-site.git
git push -u origin main
```

Luego entra en Vercel, importa el repositorio y pulsa Deploy.

No necesitas configurar Python para publicar esta primera versión.

## Siguiente versión

Cuando esta V1 esté publicada podemos añadir:

- Panel de administración.
- Login.
- Subida de canciones desde el navegador.
- Gestión de fotos.
- Gestión de vídeos.
- Base de datos.
- API Flask.
- Cloudinary para imágenes y audio.
- Dominio personalizado.
