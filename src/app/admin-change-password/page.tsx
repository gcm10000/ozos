'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/clientside';

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false); // <- controle da verificação
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.me();

      if (!user) {
        router.replace('/admin-login');
        return;
      }

      if (!user.passwordChangeRequired) {
        router.replace('/admin/dashboard');
        return;
      }

      setUsername(user.username);
      setChecked(true);
    };

    fetchUser();
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        variant: 'destructive',
      });
    }

    if (newPassword.length < 6) {
      return toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 6 caracteres',
        variant: 'destructive',
      });
    }

    try {
      setLoading(true);
      await authService.changePassword({ username, newPassword });
      await authService.login({ username, password: newPassword });

      toast({
        title: 'Sucesso',
        description: 'Senha alterada com sucesso!',
      });

      router.push('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar senha',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!checked) {
    return null; // <- retorna vazio enquanto verifica se deve mostrar o formulário
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-ozos-navy">Alterar Senha</h1>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            id="username"
            type="email"
            placeholder="E-mail"
            value={username}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            id="newPassword"
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
