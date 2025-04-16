
import { apiService } from './apiService';

export interface CategoriesResponse {
  categories: string[];
}

export interface AddCategoryRequest {
  name: string;
}

export interface AddCategoryResponse {
  success: boolean;
  category: string;
}

export interface DeleteCategoryResponse {
  success: boolean;
  message: string;
}

class CategoryService {
  /**
   * Obtém todas as categorias
   */
  async getCategories(): Promise<CategoriesResponse> {
    return apiService.get<CategoriesResponse>('/categories');
  }

  /**
   * Adiciona uma nova categoria
   */
  async addCategory(name: string): Promise<AddCategoryResponse> {
    return apiService.post<AddCategoryResponse>('/categories', true, { name });
  }

  /**
   * Exclui uma categoria
   */
  async deleteCategory(name: string): Promise<DeleteCategoryResponse> {
    return apiService.delete<DeleteCategoryResponse>(`/categories/${encodeURIComponent(name)}`);
  }
}

export const categoryService = new CategoryService();