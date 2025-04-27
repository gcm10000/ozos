import { API_CONFIG } from "@/config/api";
import { publicPostService } from "@/services/serverside/publicPostService";

let cachedSitemap: string | null = null;
let lastGenerated: number = 0;

async function getDynamicRoutes() {
  const posts = await publicPostService.getPublicPosts({ page: 1, limit: 99999 });
  return posts.data.map((post: any) => `blog/${post.slug}`);
}

function normalizeUrl(url?: string, fallback = ''): string {
  if (!url) return fallback;
  let result = url.trim();
  if (!/^https?:\/\//i.test(result)) {
    result = `https://${result}`;
  }
  return result.replace(/\/+$/, '');
}

export async function GET() {
    const CACHE_TTL = 60 * 60 * 1000; // 1h
    const now = Date.now();
  
    if (cachedSitemap && (now - lastGenerated < CACHE_TTL)) {
      return new Response(cachedSitemap, {
        headers: { 'Content-Type': 'application/xml' },
      });
    }
  
    const baseUrl = normalizeUrl(API_CONFIG.frontEndUrl);
    const staticRoutes = ['']; // home
    const dynamicRoutes = await getDynamicRoutes();
    const lastmod = new Date().toISOString();
  
    const allRoutes = [...staticRoutes, ...dynamicRoutes].map(route => {
      const priority = route === '' ? '1.0' : '0.7';
      return `
        <url>
          <loc>${baseUrl}/${route}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${priority}</priority>
        </url>`;
    });
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes.join('\n')}
      </urlset>`;
  
    cachedSitemap = sitemap;
    lastGenerated = now;
  
    return new Response(sitemap, {
      headers: { 'Content-Type': 'application/xml' },
    });
}
  