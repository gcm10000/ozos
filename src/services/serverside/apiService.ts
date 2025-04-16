import { API_CONFIG, TenancyId } from '@/config/api';
import { cookies } from 'next/headers';
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

class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const headers = { ...this.defaultHeaders };
    const authToken = await this.getAuthTokenFromCookies();
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
      console.log("Token de autenticação adicionado nos headers");
    } else {
      console.warn("Nenhum token de autenticação encontrado nos cookies");
    }
    
    return headers;
  }
  
  // Método para obter o token de autenticação dos cookies usando cookie-js
  private async getAuthTokenFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value || null;
    
    if (token) {
      console.log("Token de autenticação encontrado nos cookies");
    } else {
      console.warn("Token de autenticação não encontrado nos cookies");
    }
    
    return token;
  }

  private buildUrl(endpoint: string, addTenancy: boolean = true): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = addTenancy ? `${this.baseURL}/${TenancyId}${normalizedEndpoint}` : `${this.baseURL}${normalizedEndpoint}`;
    
    console.log("URL construída:", url);
    return url;
  }

  private async handleResponse(response: Response): Promise<any> {
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

      console.error("Erro na requisição:", errorData);
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
      console.log("Dados retornados:", data);
      return data;
    } catch (error) {
      const text = await response.text();
      console.log("Texto retornado:", text);
      return text;
    }
  }

  async get<T>(endpoint: string, addTenancy: boolean = true, params?: Record<string, any>): Promise<T> {
    let url = this.buildUrl(endpoint, addTenancy);

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

    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint, addTenancy);
    
    console.log("Fazendo requisição POST para URL:", url);
    console.log("Dados enviados:", data);

    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async put<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint, addTenancy);

    console.log("Fazendo requisição PUT para URL:", url);
    console.log("Dados enviados:", data);

    const response = await fetch(url, {
      method: 'PUT',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async patch<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint, addTenancy);

    console.log("Fazendo requisição PATCH para URL:", url);
    console.log("Dados enviados:", data);

    const response = await fetch(url, {
      method: 'PATCH',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async delete<T>(endpoint: string, addTenancy: boolean = true): Promise<T> {
    const url = this.buildUrl(endpoint, addTenancy);

    console.log("Fazendo requisição DELETE para URL:", url);

    const response = await fetch(url, {
      method: 'DELETE',
      cache: 'no-store',
      headers: await this.getHeaders(),
      credentials: 'include'
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
