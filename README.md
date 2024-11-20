# Blog Svelte con WordPress

Este proyecto es un blog simple construido con Svelte que consume datos de la API REST de WordPress.  Permite mostrar entradas de blog, filtrarlas por categoría y paginar los resultados.

## Características

* **Consume la API REST de WordPress:**  Obtiene entradas de blog y categorías de un sitio WordPress especificado.
* **Filtrado por categoría:**  Permite a los usuarios filtrar las entradas por categoría.
* **Paginación:**  Divide las entradas en páginas para una mejor navegación.
* **Diseño responsivo:**  Se adapta a diferentes tamaños de pantalla.

## Cómo ejecutar el proyecto

1. Clona el repositorio: `git clone https://github.com/ximosa/svelte-wp`
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`


## Características Principales

### WordPress Integration
- Consume WordPress REST API
- Filtrado por categorías
- Paginación de posts
- URLs amigables usando slugs
- Store centralizado para estado

### Blogger Integration  
- Consume Blogger API v3
- Filtrado por etiquetas
- Paginación con tokens
- URLs amigables generadas desde títulos
- Extracción de imágenes destacadas
- Scroll automático al paginar

## APIs Utilizadas

### WordPress
- Endpoint: `/wp/v2/posts`
- Filtros por categoría
- Paginación por offset

### Blogger
- Endpoint: `googleapis.com/blogger/v3`
- API Key requerida
- Paginación por tokens
- Búsqueda por etiquetas

## Rutas

- `/blog` - Lista posts WordPress
- `/blog/[slug]` - Post individual WordPress  
- `/blogger` - Lista posts Blogger
- `/blogger/[slug]` - Post individual Blogger

## Características Comunes
- Diseño responsive
- Extractos de posts
- Imágenes destacadas
- Navegación por categorías
- Paginación
- URLs amigables


## Dependencias

* Svelte
* Otras dependencias listadas en `package.json`

## Contribuciones

Las contribuciones son bienvenidas.  Por favor, abre un "issue" o envía un "pull request".

## Licencia

[@, MIT]

