import { API_CONFIG } from '@/config/api';
import { redirect } from 'next/navigation';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

class PublicApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const headers = { ...this.defaultHeaders };
    
    if (API_CONFIG.blogXApiKey) {
      headers['X-API-KEY'] = API_CONFIG.blogXApiKey;
      console.log("Token de autenticação adicionado no X-API-KEY");
    } else {
      console.warn("X-API-KEY não foi encontrado.");
    }
    
    return headers;
  }

  private async buildUrl(endpoint: string, addTenancy: boolean = true): Promise<string> {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = addTenancy ? `${this.baseURL}/${API_CONFIG.tenancyId}${normalizedEndpoint}` : `${this.baseURL}${normalizedEndpoint}`;
    
    console.log("URL construída:", url);
    return url;
  }

  private async handleResponse(response: Response, url: string): Promise<any> {
    console.log("Resposta recebida:", response.status);
    
    if (!response.ok) {
      if (response.status === 404) return null;

      const errorData = await response.json().catch(() => ({}));

      if (response.status == 401) {
        console.error("Erro de autenticação. Redirecionando para login...");
        redirect('/admin-login');
      }

      if (response.status == 403) {
        console.error("Acesso proibido. Redirecionando para a página 403...");
        redirect('/403');
      }

      console.error(`Erro na requisição (${url}):`, errorData);
      throw new ApiError(
        errorData.message || `Erro na requisição: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) {
      console.log("Nenhum conteúdo retornado.");
      return {};
    }

    try {
      const data = await response.json();
      console.log(`Dados retornados: (${url})`, data);
      return data;
    } catch (error) {
      const text = await response.text();
      console.log("Texto retornado:", text);
      return text;
    }
  }

  async get<T>(endpoint: string, addTenancy: boolean = true, params?: Record<string, any>): Promise<T> {
    let url = await this.buildUrl(endpoint, addTenancy);

    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      url += `?${queryParams.toString()}`;
    }

    console.log("Fazendo requisição GET para URL:", url);

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: await this.getHeaders(),
      credentials: 'include'
    });

    return this.handleResponse(response, url);
  }
}

export const publicApiService = new PublicApiService();
