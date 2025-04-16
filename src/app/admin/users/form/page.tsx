'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Save, ArrowLeft } from 'lucide-react';
import { userService } from '@/services/clientside';

const UserForm = () => {
  const { slug } = useParams();
  const isEditing = !!slug;
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Author' as 'Administrator' | 'Author'
  });

  useEffect(() => {
    if (isEditing) {
      userService.getUserById(Number(slug))
        .then((data) => {
          setUser({
            // username: data.username,
            name: data.name,
            email: data.email,
            password: '',
            confirmPassword: '',
            role: data.role
          });
        })
        .catch(() => {
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar o usuário',
            variant: 'destructive'
          });
          router.push('/admin/users');
        });
    }
  }, [isEditing, slug, toast, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.name || !user.email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (!isEditing && (!user.password || user.password.length < 6)) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await userService.updateUser(Number(slug), {
          name: user.name,
          email: user.email,
          role: user.role,
          ...(user.password ? { password: user.password } : {})
        });
      } else {
        await userService.createUser({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        });
      }

      toast({
        title: isEditing ? "Usuário atualizado" : "Usuário criado",
        description: isEditing 
          ? "O usuário foi atualizado com sucesso" 
          : "O usuário foi criado com sucesso"
      });

      router.push('/admin/users');

    } catch (error: any) {
      toast({
        title: "Erro",
        description: error?.response?.data?.message || "Erro ao salvar usuário",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        onClick={() => router.push('/admin/users')}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar para a lista
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">
          {isEditing ? 'Editar Usuário' : 'Criar Novo Usuário'}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo*
            </label>
            <Input
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Nome completo"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Função*
            </label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required
            >
              <option value="Administrator">Administrador</option>
              <option value="Author">Autor</option>
            </select>
          </div>

          {(!isEditing || user.password) && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {isEditing ? 'Nova Senha' : 'Senha*'}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder={isEditing ? 'Deixe em branco para manter a atual' : 'Senha'}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {isEditing ? 'Confirmar Nova Senha' : 'Confirmar Senha*'}
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar senha"
                />
              </div>
            </>
          )}

          <div className="pt-4">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto"
            >
              <Save size={16} className="mr-2" />
              {loading ? 'Salvando...' : 'Salvar Usuário'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
