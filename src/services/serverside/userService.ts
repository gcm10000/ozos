
import { apiService } from './apiService';
import { User } from '@/types/blog';

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'Administrator' | 'Author';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'Administrator' | 'Author';
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

class UserService {
  /**
   * Obtém a lista de usuários com paginação
   */
  async getUsers(params?: UserListParams): Promise<UserListResponse> {
    return apiService.get<UserListResponse>('/users', true, params);
  }

  /**
   * Obtém um usuário pelo ID
   */
  async getUserById(id: number): Promise<User> {
    return apiService.get<User>(`/users/${id}`);
  }

  /**
   * Cria um novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    return apiService.post<User>('/users', true, userData);
  }

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    return apiService.put<User>(`/users/${id}`, true, userData);
  }

  /**
   * Exclui um usuário
   */
  async deleteUser(id: number): Promise<DeleteUserResponse> {
    return apiService.delete<DeleteUserResponse>(`/users/${id}`);
  }
}

export const userService = new UserService();