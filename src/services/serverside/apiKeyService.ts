// serverside/apiKeyService.ts

import { apiService } from './apiService';

export interface GenerateApiKeyRequest {
  tenancyId: number;
  scopes: string[];
}

export interface GenerateApiKeyResponse {
  key: string;
  expiration: string;
}

export interface ApiKeyDto {
  name: string;
  id: number;
  key: string;
  createdAt: string;
  isActive: boolean;
  scopes: string[];
  tenancyId: number;
}

export interface RemoveApiKeyResponse {
  success: boolean;
  message: string;
}

class ApiKeyService {
  /**
   * Gera uma nova API Key para um tenancy
   */
  async generateApiKey(data: GenerateApiKeyRequest): Promise<GenerateApiKeyResponse> {
    return apiService.post<GenerateApiKeyResponse>('/apikeys/generate', true, data);
  }

  /**
   * Lista todas as API Keys de um tenancy
   */
  async getApiKeys(name: string): Promise<ApiKeyDto[]> {
    return apiService.get<ApiKeyDto[]>(`/apikeys?name=${name}`);
  }
    
  /**
   * Obtém um apiKey específico pelo seu ID
   */
  async getById(id: number): Promise<ApiKeyDto> {
    return apiService.get<ApiKeyDto>(`/apikeys/${id}`);
  }

  /**
   * Revoga uma API Key específica
   */
  async removeApiKey(id: number): Promise<boolean> {
    return apiService.delete<boolean>(`/apikeys/${id}`, true);
  }
}

export const apiKeyService = new ApiKeyService();
