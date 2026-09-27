/** Resolve paths against Astro's deployment base without assuming a trailing slash. */
export const sitePath = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
