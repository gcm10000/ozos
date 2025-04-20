// clientside/tenancyService.ts

import { apiService } from './apiService';

export interface Tenancy {
  id: number;
  apiKeyDefaultKey: string;
  name: string;
  mainAdministratorEmail: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  isMainTenancy: boolean;
}

export interface TenancyListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface TenancyListResponse {
  data: Tenancy[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateTenancyRequest {
  name?: string;
  email?: string;
  url?: string;
}

export interface UpdateTenancyRequest {
  name?: string;
  email?: string;
  url?: string;
}

export interface DeleteTenancyResponse {
  success: boolean;
  message: string;
}

class TenancyService {
  /**
   * Obtém a lista de tenancies com paginação
   */
  async getTenancies(params?: TenancyListParams): Promise<TenancyListResponse> {
    return apiService.get<TenancyListResponse>('/tenancy', false, params);
  }

  /**
   * Obtém um tenancy pelo ID
   */
  async getTenancyById(id: number): Promise<Tenancy> {
    return apiService.get<Tenancy>(`/tenancy/${id}`, false);
  }

  /**
   * Cria um novo tenancy
   */
  async createTenancy(tenancyData: CreateTenancyRequest): Promise<Tenancy> {
    return apiService.post<Tenancy>('/tenancy', false, tenancyData);
  }

  /**
   * Atualiza um tenancy existente
   */
  async updateTenancy(id: number, tenancyData: UpdateTenancyRequest): Promise<Tenancy> {
    return apiService.put<Tenancy>(`/tenancy/${id}`, false, tenancyData);
  }

  /**
   * Exclui um tenancy
   */
  async deleteTenancy(id: number): Promise<DeleteTenancyResponse> {
    return apiService.delete<DeleteTenancyResponse>(`/tenancy/${id}`, false);
  }
}

export const tenancyService = new TenancyService();
