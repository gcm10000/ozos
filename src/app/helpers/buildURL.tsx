  
  export default function buildUrl(endpoint: string): string {
    if (endpoint.startsWith('/')) {
      const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5215';
  
      return `${baseUrl}${normalizedEndpoint}`;
    }
    
    return endpoint;
  }