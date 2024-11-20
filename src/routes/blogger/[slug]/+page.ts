import { BLOGGER_CONFIG } from '$lib/config';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const { API_KEY, BLOG_ID } = BLOGGER_CONFIG;
    
    // Aumentamos maxResults para obtener más posts
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`
    );
    const data = await response.json();
    
    const post = data.items.find(post => {
        const postSlug = post.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
        return postSlug === params.slug;
    });

    if (!post) {
        throw error(404, 'Post no encontrado');
    }

    return { post };
}

