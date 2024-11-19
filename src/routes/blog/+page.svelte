<script>
    import { onMount } from 'svelte';
    const siteID = 'expertoweb2.wordpress.com';
    let posts = [];
    let categories = [];
    let currentPage = 1;
    let totalPages = 0;
    let selectedCategory = '';
    const postsPerPage = 6;

    async function fetchCategories() {
        const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteID}/categories`);
        categories = await response.json();
    }

    async function fetchPosts(page = 1, category = '') {
        let url = `https://public-api.wordpress.com/wp/v2/sites/${siteID}/posts?page=${page}&per_page=${postsPerPage}`;
        if (category) {
            url += `&categories=${category}`;
        }
        
        const response = await fetch(url);
        totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
        posts = await response.json();
    }

    function handleCategoryChange(event) {
        selectedCategory = event.target.value;
        currentPage = 1;
        fetchPosts(currentPage, selectedCategory);
    }

    function handlePageChange(page) {
        currentPage = page;
        fetchPosts(page, selectedCategory);
    }

    function getFirstImage(content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const img = doc.querySelector('img');
        return img ? img.src : '';
    }

    onMount(async () => {
        await fetchCategories();
        await fetchPosts(1);
    });
    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
</script>

<div class="blog-container">
    <h1>Blog</h1>

    <div class="filters">
        <select on:change={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {#each categories as category}
                <option value={category.id}>{category.name}</option>
            {/each}
        </select>
    </div>
    
    <div class="posts-grid">
        {#each posts as post}
            <div class="post">
                {#if getFirstImage(post.content.rendered)}
                    <div class="post-image">
                        <a href="/blog/{post.slug}">
                            <img src={getFirstImage(post.content.rendered)} alt={post.title.rendered}>
                        </a>
                    </div>
                {/if}
               <h2>
    <a href="/blog/{post.slug}">{decodeHTML(post.title.rendered)}</a>
</h2>
                <div class="excerpt">
                    {@html post.excerpt.rendered}
                </div>
                <a href="/blog/{post.slug}" class="read-more">Leer más →</a>
            </div>
        {/each}
    </div>

    <div class="pagination">
        {#if totalPages > 1}
            {#each Array(totalPages) as _, i}
                <button 
                    class:active={currentPage === i + 1}
                    on:click={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </button>
            {/each}
        {/if}
    </div>
</div>

<style>
    .blog-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .filters {
        margin-bottom: 2rem;
    }

    select {
        padding: 0.5rem;
        border-radius: 4px;
        min-width: 200px;
    }

    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .post {
        background: #fff;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
 .post h2{
        font-size: 1.5rem;
    }
    .post-image img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }

    .pagination {
        margin-top: 2rem;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }

    .pagination button {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        background: white;
        color: #000;
        border-radius: 4px;
        cursor: pointer;
    }

    .pagination button.active {
        background: #ff3e00;
        color: white;
        border-color: #ff3e00;
    }

    h2 a {
        color: inherit;
        text-decoration: none;
    }

    .read-more {
        display: inline-block;
        margin-top: 1rem;
        color: #ff3e00;
        text-decoration: none;
        font-weight: bold;
    }
</style>
