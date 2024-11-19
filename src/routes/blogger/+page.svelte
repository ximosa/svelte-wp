<script>
    import { onMount } from 'svelte';
  
    const API_KEY = 'AIzaSyBFBbH1SQkSZf1LJzammWAe2karh5mG9rQ';
    const BLOG_ID = '2756493429384988662';
    const POSTS_POR_PAGINA = 5;
  
    let posts = [];
    let categorias = [];
    let categoriaSeleccionada = '';
    let paginaActual = 1;
    let tokenSiguiente = '';
    let tokenAnterior = [];
  
    function crearSlug(texto) {
      return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);
    }
  
    function crearExtracto(contenidoHTML, longitud = 200) {
      const temp = document.createElement('div');
      temp.innerHTML = contenidoHTML;
      const texto = temp.textContent || temp.innerText;
      return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
    }
  
    async function obtenerCategorias() {
      try {
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`;
        const response = await fetch(url);
        const data = await response.json();
        const posts = data.items || [];
        
        const categoriasUnicas = new Set();
        posts.forEach(post => {
          if (post.labels && Array.isArray(post.labels)) {
            post.labels.forEach(label => categoriasUnicas.add(label));
          }
        });
        
        categorias = Array.from(categoriasUnicas).sort();
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    }
  
    async function obtenerPosts(pageToken = '') {
      try {
        let url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${POSTS_POR_PAGINA}${pageToken ? '&pageToken=' + pageToken : ''}`;
        
        if (categoriaSeleccionada) {
          url += `&labels=${encodeURIComponent(categoriaSeleccionada)}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        posts = data.items || [];
        tokenSiguiente = data.nextPageToken || '';
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    }
  
    function filtrarPorCategoria(categoria) {
      categoriaSeleccionada = categoria;
      paginaActual = 1;
      tokenAnterior = [];
      tokenSiguiente = '';
      obtenerPosts();
    }
  
    async function cambiarPagina(direccion) {
      if (direccion === 'siguiente' && tokenSiguiente) {
        tokenAnterior.push(tokenSiguiente);
        paginaActual++;
        await obtenerPosts(tokenSiguiente);
      } else if (direccion === 'anterior' && paginaActual > 1) {
        paginaActual--;
        tokenAnterior.pop();
        const tokenPaginaAnterior = tokenAnterior[tokenAnterior.length - 1] || '';
        await obtenerPosts(tokenPaginaAnterior);
      }
    }
  
    onMount(() => {
      obtenerCategorias();
      obtenerPosts();
    });
  </script>
  
  <div id="inicio" />
  
  <div style="max-width: 800px;margin: auto;padding:1rem;">
    <h1>Blog</h1>
  
    <div class="field label border">
      <select bind:value={categoriaSeleccionada} on:change={() => filtrarPorCategoria(categoriaSeleccionada)}>
        <option value="">Todas las categorías</option>
        {#each categorias as categoria}
          <option value={categoria}>{categoria}</option>
        {/each}
      </select>
      <label>Categorías</label>
    </div>
  
    <div class="medium-space" />
  
    <div id="posts">
      {#each posts as post}
        {@const imagenUrl = post.content?.match(/<img.+?src="(.*?)"/)?.[1] || 'https://via.placeholder.com/150'}
        {@const extracto = crearExtracto(post.content)}
        {@const slug = crearSlug(post.title)}
        <div class="post">
          <div class="row">
            <div><img class="left-round medium" src={imagenUrl} alt={post.title}></div>
            <div class="max">
              <h2 class="small">
                <a href="/blog/{slug}?id={post.id}">{post.title}</a>
              </h2>
            </div>
          </div>
          <p>{extracto}</p>
          <div class="small-space" />
          <div class="right-align">
            <a class="link large-text underline" href="/blog/{slug}?id={post.id}">Ver más</a>
          </div>
          <div class="small-space" />
        </div>
        <hr class="medium">
      {/each}
    </div>
  
    <div class="large-space" />
  
    <div class="center-align">
      <button disabled={paginaActual === 1} on:click={() => cambiarPagina('anterior')}>Anterior</button>
      <span>Página {paginaActual}</span>
      <button disabled={!tokenSiguiente} on:click={() => cambiarPagina('siguiente')}>Siguiente</button>
    </div>
  </div>
  