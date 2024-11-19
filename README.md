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

## Configuración

El ID del sitio de WordPress se configura en el archivo `+page.svelte` y actualmente está configurado como `expertoweb2.wordpress.com`.  Puedes cambiarlo para usar tu propio sitio de WordPress.

## Dependencias

* Svelte
* Otras dependencias listadas en `package.json`

## Contribuciones

Las contribuciones son bienvenidas.  Por favor, abre un "issue" o envía un "pull request".

## Licencia

[@, MIT]

