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
    }
    
    return headers;
  }
  
  // Método para obter o token de autenticação dos cookies usando cookie-js
  private async getAuthTokenFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;  // Retorna o token armazenado no cookie, ou null se não existir
  }

  private buildUrl(endpoint: string, addTenancy: boolean = true): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
    if (addTenancy) {
      return `${this.baseURL}/${TenancyId}${normalizedEndpoint}`;
    }
  
    return `${this.baseURL}${normalizedEndpoint}`;
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      if (response.status === 404) return null;

      const errorData = await response.json().catch(() => ({}));

      if (response.status == 403)
        redirect('/403');
      
      throw new ApiError(
        errorData.message || `Erro na requisição: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) return {};

    try {
      return await response.json();
    } catch (error) {
      return await response.text();
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

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: await this.getHeaders(),
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'POST',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async put<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'PUT',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async patch<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'PATCH',
      cache: 'no-store',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });

    return this.handleResponse(response);
  }

  async delete<T>(endpoint: string, addTenancy: boolean = true): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'DELETE',
      cache: 'no-store',
      headers: await this.getHeaders(),
      credentials: 'include'
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
