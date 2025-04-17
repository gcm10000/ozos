
import { apiService } from './apiService';
import Cookies from 'js-cookie';
import { User } from '@/types/blog';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  clientId: number;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ChangePasswordRequest {
  username: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
      const response = await apiService.post<LoginResponse>('/auth/login', false, credentials);
      // Salva tokens e user nos cookies
      if (response.access_token){
        Cookies.set('access_token', response.access_token, { secure: true });
      }

      if (response.refresh_token)
        Cookies.set('refresh_token', response.refresh_token, { secure: true });
      Cookies.set('user', JSON.stringify(response.user), { secure: true });
      
      if (response.clientId)
        Cookies.set('clientId', response.clientId.toString(), { secure: true });
      
      return response;
    }
  
    async refreshToken(): Promise<RefreshTokenResponse | null> {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) return null;
  
      const response = await apiService.post<RefreshTokenResponse>('/api/v1/auth/refresh', false, {
        refresh_token: refreshToken
      });
  
      // Atualiza os tokens
      Cookies.set('access_token', response.access_token, { secure: true });
      Cookies.set('refresh_token', response.refresh_token, { secure: true });
  
      return response;
    }
  
    async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
      return apiService.post<ChangePasswordResponse>('/api/v1/auth/change-password', false, data);
    }
  
    logout(): void {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user');
    }
  
    isAuthenticated(): boolean {
      const accessToken = Cookies.get('access_token');
      return !!accessToken;
    }
  
    getCurrentUser(): User | null {
      const userCookie = Cookies.get('user');
      if (!userCookie) return null;
  
      try {
        return JSON.parse(userCookie);
      } catch (error) {
        return null;
      }
    }
  
    async me(): Promise<User | null> {
      try {
        const user = await apiService.get<User>('/auth/me', false);
  
        // Atualiza o cookie do usuário
        Cookies.set('user', JSON.stringify(user), { secure: true });
  
        return user;
      } catch (error) {
        console.error('Erro ao buscar usuário logado:', error);
        return null;
      }
    }
  }
  
  export const authService = new AuthService();