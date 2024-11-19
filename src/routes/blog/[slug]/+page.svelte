<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    const siteID = 'expertoweb2.wordpress.com';
    let post = null;

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    async function fetchPost(slug) {
        try {
            const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteID}/posts?slug=${slug}`);
            const data = await response.json();
            post = data[0];
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }

    onMount(() => {
        const slug = $page.params.slug;
        if (slug) {
            fetchPost(slug);
        }
    });
</script>

{#if post}
    <article class="post-content">
    <a href="/blog" class="button transparent large-text bold nav-link">Volver al Blog</a>
        <div class="post-header">
            <h1>{decodeHTML(post.title.rendered)}</h1>
            <div class="post-meta">
                <span class="date">{new Date(post.date).toLocaleDateString()}</span>
            </div>
        </div>
        <div class="content">
            {@html post.content.rendered}
        </div>
    </article>
{:else}
    <div class="loading">
        <p>Cargando post...</p><progress class="circle large"></progress>
    </div>
{/if}

<style>
    .post-content {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
    }

    .post-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    .post-meta {
        font-size: 0.9rem;
    }

    .content {
        line-height: 1.8;
    }

    .content :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 2rem 0;
    }

    .content :global(p) {
        margin-bottom: 1.5rem;
    }

    .content :global(h2) {
        margin: 2rem 0 1rem;
    }

    .content :global(a) {
        color: #ff3e00;
        text-decoration: none;
    }

    .content :global(a:hover) {
        text-decoration: underline;
    }

    .content :global(blockquote) {
        border-left: 4px solid #ff3e00;
        margin: 1.5rem 0;
        padding-left: 1rem;
    }

    .content :global(pre) {
        background: #f4f4f4;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
    }

    .loading {
        text-align: center;
        padding: 3rem;
        color: #666;
    }
</style>
