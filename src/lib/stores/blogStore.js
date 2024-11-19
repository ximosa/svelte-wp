import { writable } from 'svelte/store';

export const currentPage = writable(1);
export const currentCategory = writable('');
export const posts = writable([]);
export const categories = writable([]);
