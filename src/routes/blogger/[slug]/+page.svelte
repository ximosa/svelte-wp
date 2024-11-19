<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
  
    const API_KEY = 'AIzaSyBFBbH1SQkSZf1LJzammWAe2karh5mG9rQ';
    const BLOG_ID = '2756493429384988662';
  
    let post = null;
  
    onMount(async () => {
      const postId = $page.url.searchParams.get('id');
      if (postId) {
        try {
          const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}`);
          post = await response.json();
        } catch (error) {
          console.error('Error al cargar el post:', error);
        }
      }
    });
  </script>
  
  {#if post}
    <div style="max-width: 800px;margin: auto;padding:1rem;">
      <h1>{post.title}</h1>
      <div class="post-content">
        {@html post.content}
      </div>
      <div class="medium-space" />
      <a href="/blog">← Volver al blog</a>
    </div>
  {:else}
    <p>Cargando...</p>
  {/if}
  