// clientside/apiScopesService.ts

import { apiService } from './apiService';

export interface ApiScopeDto {
  id: number;
  name: string;
}

export class ApiScopesService {
  /**
   * Lista todos os escopos disponíveis
   */
  async getAll(): Promise<ApiScopeDto[]> {
    return apiService.get<ApiScopeDto[]>('/apiscopes', false);
  }
}

export const apiScopesService = new ApiScopesService();
