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

## 🚀 Introducción

SvelteKit WP es una aplicación moderna que integra de manera elegante contenido de WordPress.com y Blogger en una interfaz construida con SvelteKit. Este proyecto demuestra cómo crear una aplicación web de alto rendimiento que consume múltiples APIs de blogs para presentar contenido de manera unificada.

### ✨ Características Principales

- 🔄 Integración simultánea con WordPress.com y Blogger APIs
- ⚡ Renderizado del lado del servidor (SSR) para optimización SEO
- 🎨 Diseño responsivo con BeerCSS
- 🌓 Modo oscuro/claro
- 📱 Navegación móvil optimizada
- 🔍 SEO optimizado
- ⚡ Carga progresiva de imágenes

## 🛠️ Tecnologías Utilizadas

- **Frontend**: SvelteKit
- **UI Framework**: BeerCSS
- **APIs**: 
  - WordPress.com REST API
  - Blogger API v3
- **Optimización**: 
  - SSR (Server-Side Rendering)
  - Lazy Loading
  - Image Optimization

## 🔧 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/ximosa/svelte-wp.git

# Instalar dependencias
cd svelte-wp
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📐 Arquitectura

La aplicación está estructurada siguiendo las mejores prácticas de SvelteKit:

```plaintext
svelte-wp/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   ├── stores/
│   │   └── utils/
│   ├── routes/
│   │   ├── +page.svelte
│   │   └── [slug]/+page.svelte
│   └── app.html
├── static/
└── tests/
```

### 🔌 Integración con APIs

La aplicación utiliza dos endpoints principales:

1. **WordPress.com API**
```javascript
const WP_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/YOUR_SITE_ID';
```

2. **Blogger API**
```javascript
const BLOGGER_API_URL = 'https://www.googleapis.com/blogger/v3/blogs/YOUR_BLOG_ID';
```

## 🎨 Diseño y UX

El diseño se centra en la experiencia de lectura con:

- Tipografía optimizada para lectura
- Espaciado adecuado
- Contraste apropiado
- Transiciones suaves
- Adaptabilidad a diferentes dispositivos

### Ejemplo de Componente de Post

```svelte
<script>
  export let post;
  import { formatDate } from '$lib/utils';
  import { fade } from 'svelte/transition';
</script>

<article 
  class="card" 
  transition:fade={{duration: 300}}
>
  {#if post.featured_media}
    <img 
      src={post.featured_media} 
      alt={post.title.rendered}
      loading="lazy"
    />
  {/if}
  
  <div class="content">
    <h2>{@html post.title.rendered}</h2>
    <time>{formatDate(post.date)}</time>
    <div class="excerpt">
      {@html post.excerpt.rendered}
    </div>
  </div>
</article>
```

## 🔍 SEO Optimización

El proyecto implementa las mejores prácticas SEO:

- Meta tags dinámicos
- Open Graph tags
- Twitter Cards
- Sitemap XML
- Estructura de datos Schema.org

```svelte
<script>
  import { MetaTags } from '$lib/components';
  export let data;
</script>

<MetaTags
  title={data.post.title}
  description={data.post.excerpt}
  image={data.post.featured_image}
  url={data.post.url}
/>
```

## 🎯 Rendimiento

La aplicación alcanza puntuaciones altas en Lighthouse:

- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

### Optimizaciones Clave:

- Precargar recursos críticos
- Lazy loading de imágenes
- Minificación de assets
- Caching eficiente

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🙋‍♂️ Autor

**Ximosa** - [GitHub](https://github.com/ximosa)

## 🌟 Agradecimientos

- Comunidad de SvelteKit
- Equipo de WordPress.com
- Equipo de Blogger
- Contribuidores de BeerCSS

---

¿Te ha gustado este proyecto? ¡No olvides darle una ⭐️ en GitHub!

