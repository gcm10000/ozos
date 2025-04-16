'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/clientside';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login({ username, password });

      // Supondo que o response contém tokens e user
      const { access_token, refresh_token, user } = response;

      // Armazenando os dados no cookie
      Cookies.set('access_token', access_token, { expires: 1 }); // expira em 1 dia
      Cookies.set('refresh_token', refresh_token, { expires: 7 }); // expira em 7 dias
      Cookies.set('user', JSON.stringify(user), { expires: 1 });

      // Redireciona
      router.push('/admin-change-password');

    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Usuário ou senha incorretos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ozos-navy">Painel Administrativo</h1>
          <p className="text-gray-600">Faça login para acessar o painel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-ozos-blue hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
