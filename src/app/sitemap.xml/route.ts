import { API_CONFIG } from "@/config/api";
import { publicPostService } from "@/services/serverside/publicPostService";

let cachedSitemap: string | null = null;
let lastGenerated: number = 0;

async function getDynamicRoutes() {
    // Simula um fetch (poderia ser um banco, CMS, etc)
    // Exemplo: const posts = await prisma.post.findMany()
    const posts = await publicPostService.getPublicPosts({ page: 1, limit: 99999});
  
    return posts.data.map((post: any) => post.slug); // ['como-usar-next', 'dicas-de-dev']
  }

// app/sitemap.xml/route.ts
export async function GET() {
    const CACHE_TTL = 60 * 60 * 1000; // 1h

    const now = Date.now();
    if (cachedSitemap && (now - lastGenerated < CACHE_TTL)) {
      return new Response(cachedSitemap, {
        headers: { 'Content-Type': 'application/xml' },
      });
    }

    function normalizeUrl(url?: string, fallback = ''): string {
        if (!url) return fallback;
        
        let result = url.trim();
        
        // Adiciona https:// se não tiver protocolo
        if (!/^https?:\/\//i.test(result)) {
            result = `https://${result}`;
        }
        
        // Remove barra final
        result = result.replace(/\/+$/, '');
        
        return result;
    }
      

    // Exemplo de rotas estáticas e dinâmicas
    const staticRoutes = ['/'];
    const dynamicRoutes = await getDynamicRoutes(); // pode vir do banco, CMS etc
  
    const allRoutes = [...staticRoutes, ...dynamicRoutes].map(route => {
      return `
        <url>
          <loc>${normalizeUrl(API_CONFIG.frontEndUrl)}/${route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    });
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes.join('\n')}
      </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  