import { apiService } from './apiService';
import { User } from '@/types/blog';
import { cookies } from 'next/headers';

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
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

class AuthService {
  login = async (credentials: LoginRequest, ctx?: any): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>('/auth/login', false, credentials);

    const cookieStore = await cookies();

    // Configuração de cookies no lado do servidor utilizando cookies do Next.js
    cookieStore.set('access_token', response.access_token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    cookieStore.set('refresh_token', response.refresh_token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Configuração de cookies no lado do servidor utilizando cookies do Next.js
    cookieStore.set('clientId', response.clientId.toString(), {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    cookieStore.set('user', JSON.stringify(response.user), {
      path: '/',
    });

    return response;
  };

  logout = async (ctx?: any) => {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    cookieStore.delete('user');
  };

  getCurrentUser = async (ctx?: any): Promise<User | null> => {
    const cookieStore = await cookies();
    const cookieData = cookieStore.getAll(); // Acessando todos os cookies

    // Verificando se o cookie 'user' existe e retornando o valor
    const userCookie = cookieData.find(cookie => cookie.name === 'user');
    try {
      return userCookie ? JSON.parse(userCookie.value) : null;
    } catch {
      return null;
    }
  };

  isAuthenticated = async (ctx?: any): Promise<boolean> => {
    const cookieStore = await cookies();
    const cookieData = cookieStore.getAll(); // Acessando todos os cookies
    // Verificando se o cookie 'access_token' existe
    const accessTokenCookie = cookieData.find(cookie => cookie.name === 'access_token');

    return !!accessTokenCookie;
  };
    

  async me(): Promise<User | null> {
    try {
      const user = await apiService.get<User>('/auth/me', false);
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
