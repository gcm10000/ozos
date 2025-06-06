import { API_CONFIG } from '@/config/api';
import Cookies from 'js-cookie';  // Importa a biblioteca cookie-js
import { useLoadingStore } from '@/stores/useLoadingStore';
import { toast } from 'sonner';


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

type LoadingCallback = (loading: boolean) => void;
type ToastFunction = (message: string) => void;

// Classe base para requisições HTTP
class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private loadingCallback?: LoadingCallback;
  private showToast?: ToastFunction;

  setLoadingCallback(callback: LoadingCallback) {
    this.loadingCallback = callback;
  }

  private setLoadingState(state: boolean) {
    if (this.loadingCallback) {
      this.loadingCallback(state);
    }
  }

  setToastHandler(fn: ToastFunction) {
    this.showToast = fn;
  }

  private notify(message: string) {
    if (this.showToast) this.showToast(message);
  }


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
      console.log('Token de autenticação encontrado nos cookies');
    }
    
    console.log('Headers configurados:', headers);
    return headers;
  }

  // Método para obter o token de autenticação dos cookies usando cookie-js
  private getAuthTokenFromCookies(): string | null {
    const token = Cookies.get('access_token');
    console.log('Token obtido dos cookies:', token);
    return token || null;  // Retorna o token armazenado no cookie, ou null se não existir
  }

  // Método para construir a URL completa
  private buildUrl(endpoint: string, addTenancy: boolean = true): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const clientId = this.getClientId();
    const url = addTenancy ? `${this.baseURL}/${clientId}${normalizedEndpoint}` : `${this.baseURL}${normalizedEndpoint}`;
    console.log('URL construída:', url);
    return url;
  }

  getClientId(): string | null {
    const clientId = Cookies.get('clientId');
    if (!clientId)
      return null;

    return clientId;
  }

  // Método para processar a resposta da API
  private async handleResponse(response: Response): Promise<any> {
    console.log('Resposta recebida:', response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      this.notify(errorData.message || 'Erro na requisição');
    
      throw new ApiError(
        errorData.message || `Erro na requisição: ${response.status}`,
        response.status,
        errorData
      );
    }
        
    if (response.status === 204) {
      console.log('Resposta 204 - No Content');
      return {};
    }
    
    try {
      const jsonResponse = await response.json();
      console.log('Resposta JSON:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      const textResponse = await response.text();
      console.log('Resposta em texto:', textResponse);
      return textResponse;
    }
  }

  // Método GET
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
    
    console.log('Fazendo requisição GET para:', url);

    try {
        this.setLoadingState(true);
        const response = await fetch(url, {
          method: 'GET',
          headers: this.getHeaders(),
          credentials: 'include'
        });
        
        return this.handleResponse(response);
    } finally {
      this.setLoadingState(false);
    }

  }

  // Método POST
  async post<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const isFormData = data instanceof FormData;
    const headers = this.getHeaders();
  
    if (isFormData) {
      delete headers['Content-Type'];  // Remove Content-Type se for FormData
      console.log('Usando FormData, Content-Type removido');
    }
  
    console.log('Fazendo requisição POST para:', this.buildUrl(endpoint, addTenancy), 'com dados:', data);

    try {
      this.setLoadingState(true);
      const response = await fetch(this.buildUrl(endpoint, addTenancy), {
        method: 'POST',
        headers,
        body: isFormData ? data : JSON.stringify(data),
        credentials: 'include'
      });
    
      return this.handleResponse(response);
    }
    finally {
      this.setLoadingState(false);
    }
  }

  // Método PUT
  async put<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    const isFormData = data instanceof FormData;
    const headers = this.getHeaders();
  
    if (isFormData) {
      delete headers['Content-Type'];  // Importante: deixe o browser definir
      console.log('Usando FormData, Content-Type removido');
    }
  
    console.log('Fazendo requisição PUT para:', this.buildUrl(endpoint, addTenancy), 'com dados:', data);

    try {
      this.setLoadingState(true);
      const response = await fetch(this.buildUrl(endpoint, addTenancy), {
        method: 'PUT',
        headers,
        body: isFormData ? data : JSON.stringify(data),
        credentials: 'include'
      });
    
      return this.handleResponse(response);
    } finally {
      this.setLoadingState(false);
    }
  }

  // Método PATCH
  async patch<T>(endpoint: string, addTenancy: boolean = true, data?: any): Promise<T> {
    console.log('Fazendo requisição PATCH para:', this.buildUrl(endpoint, addTenancy), 'com dados:', data);
    
    try {
      this.setLoadingState(true);
      const response = await fetch(this.buildUrl(endpoint, addTenancy), {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include'
      });
      
      return this.handleResponse(response);
    } finally {
      this.setLoadingState(false);
    }
  }

  // Método DELETE
  async delete<T>(endpoint: string, addTenancy: boolean = true): Promise<T> {
    console.log('Fazendo requisição DELETE para:', this.buildUrl(endpoint, addTenancy));

    try {
      this.setLoadingState(true);
      const response = await fetch(this.buildUrl(endpoint, addTenancy), {
        method: 'DELETE',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      
      return this.handleResponse(response);
    } finally {
      this.setLoadingState(false);
    }
  }
}

// Exporta uma instância única do serviço
export const apiService = new ApiService();
