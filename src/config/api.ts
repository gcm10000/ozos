// src/config/api.ts
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5215/api/v1',
  tenancyId: process.env.NEXT_PUBLIC_BLOG_API_TENANCYID,
  blogXApiKey: process.env.NEXT_PUBLIC_BLOG_X_API_KEY,
  frontEndUrl: process.env.NEXT_PUBLIC_FRONT_END_URL,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  timeout: 120000, // Aumentado para 120 segundos para lidar com uploads de imagens
  headers: {
    'Content-Type': 'application/json'
  }
};

// Constantes de configuração para upload de imagens
export const IMAGE_UPLOAD_CONFIG = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  defaultPlaceholder: '/placeholder.svg'
};


// export const BlogApiTenancyId = 1;