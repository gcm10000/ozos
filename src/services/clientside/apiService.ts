import { API_CONFIG, TenancyId } from '@/config/api';
import Cookies from 'js-cookie';  // Importa a biblioteca cookie-js

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

// Classe base para requisições HTTP
class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  // Método para obter os headers com token de autenticação se disponível
  private getHeaders(): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    const authToken = this.getAuthTokenFromCookies();
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;

    }
    
    return headers;
  }
  

  // Método para obter o token de autenticação dos cookies usando cookie-js
  private getAuthTokenFromCookies(): string | null {
    return Cookies.get('access_token') || null;  // Retorna o token armazenado no cookie, ou null se não existir
  }

  // Método para construir a URL completa
  private buildUrl(endpoint: string, addTenancy: boolean = true): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
    if (addTenancy) {
      return `${this.baseURL}/${TenancyId}${normalizedEndpoint}`;
    }
  
    return `${this.baseURL}${normalizedEndpoint}`;
  }

  // Método para processar a resposta da API
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Erro na requisição: ${response.status}`,
        response.status,
        errorData
      );
    }
    
    // Se a resposta for 204 No Content, retorna um objeto vazio
    if (response.status === 204) {
      return {};
    }
    
    // Tenta fazer o parse do JSON, se falhar retorna o texto bruto
    try {
      return await response.json();
    } catch (error) {
      return await response.text();
    }
  }

  // Método GET
  async get<T>(endpoint: string, addTenancy: boolean = true, params?: Record<string, any>): Promise<T> {
    let url = this.buildUrl(endpoint, addTenancy);
    
    // Adiciona query params se fornecidos
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
      headers: this.getHeaders(),
      credentials: 'include'
    });
    
    return this.handleResponse(response);
  }

  // Método POST
  async post<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const isFormData = data instanceof FormData;
    
    const headers = this.getHeaders();
  
    if (isFormData) {
      // Remove Content-Type se for FormData
      delete headers['Content-Type'];
    }
  
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
      credentials: 'include'
    });
  
    return this.handleResponse(response);
  }
  

  // Método PUT
  async put<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const isFormData = data instanceof FormData;
  
    const headers = this.getHeaders();
  
    if (isFormData) {
      delete headers['Content-Type']; // Importante: deixe o browser definir
    }
  
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data),
      credentials: 'include'
    });
  
    return this.handleResponse(response);
  }
  

  // Método PATCH
  async patch<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include'
    });
    
    return this.handleResponse(response);
  }

  // Método DELETE
  async delete<T>(endpoint: string, addTenancy: boolean = true): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, addTenancy), {
      method: 'DELETE',
      headers: this.getHeaders(),
      credentials: 'include'
    });
    
    return this.handleResponse(response);
  }
}

// Exporta uma instância única do serviço
export const apiService = new ApiService();
