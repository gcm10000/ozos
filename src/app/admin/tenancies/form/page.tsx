'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Save, ArrowLeft } from 'lucide-react';
import { tenancyService } from '@/services/clientside/tenancyService';
import { userService } from '@/services/clientside/userService';
import { Select } from '@/components/ui/select';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tenancy } from '@/services/serverside';

const TenancyForm = () => {
  const { slug } = useParams();
  const isEditing = !!slug;
  const router = useRouter();
  const { toast } = useToast();
  const [createTenancyResponse, setCreateTenancyResponse] = useState<Tenancy | null>(null);

  const [loading, setLoading] = useState(false);
  const [tenancy, setTenancy] = useState({
    name: '',
    mainAdministratorEmail: '',
    url: ''
  });

  const [users, setUsers] = useState<{ email: string; id: string }[]>([]);

  useEffect(() => {
    // Buscar usuários para o select
    userService.getUsers({ page: 1, limit: 999 })
      .then(res => {
        const userList = res.data.map((user: any) => ({
          email: user.email,
          id: user.id
        }));
        setUsers(userList);
      })
      .catch(() => {
        toast({
          title: 'Erro ao carregar usuários',
          description: 'Não foi possível carregar a lista de usuários',
          variant: 'destructive'
        });
      });

    if (isEditing) {
      tenancyService.getTenancyById(Number(slug))
        .then((data) => {
          setTenancy({
            name: data.name,
            mainAdministratorEmail: data.mainAdministratorEmail,
            url: data.url
          });
        })
        .catch(() => {
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar o inquilino',
            variant: 'destructive'
          });
          router.push('/admin/tenancies');
        });
    }
  }, [isEditing, slug, toast, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTenancy(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectEmail = (value: string) => {
    setTenancy(prev => ({ ...prev, mainAdministratorEmail: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tenancy.name || !tenancy.url || !tenancy.mainAdministratorEmail) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await tenancyService.updateTenancy(Number(slug), tenancy);
      } else {
        const createTenancyResponse = await tenancyService.createTenancy(tenancy);
        setCreateTenancyResponse(createTenancyResponse);
      }

      toast({
        title: isEditing ? 'Inquilino atualizado' : 'Inquilino criado',
        description: isEditing
          ? 'O inquilino foi atualizado com sucesso'
          : 'O inquilino foi criado com sucesso'
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error?.response?.data?.message || 'Erro ao salvar inquilino',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button 
        variant="outline" 
        onClick={() => router.push('/admin/tenancies')}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar para a lista
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">
          {isEditing ? 'Editar Inquilino' : 'Criar Novo Inquilino'}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome*
            </label>
            <Input
              id="name"
              name="name"
              value={tenancy.name}
              onChange={handleChange}
              placeholder="Nome do inquilino"
              required
            />
          </div>

          <div>
            <label htmlFor="mainAdministratorEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Administrador Principal*
            </label>
          {isEditing && 
            <Select value={tenancy.mainAdministratorEmail} onValueChange={handleSelectEmail}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.email}>
                    {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        }
        {!isEditing &&
            <Input
                id="mainAdministratorEmail"
                name="mainAdministratorEmail"
                type="email"
                value={tenancy.mainAdministratorEmail}
                onChange={handleChange}
                placeholder="Email do administrador principal"
                required
            />
        }
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Url*
            </label>
            <Input
              id="url"
              name="url"
              value={tenancy.url}
              onChange={handleChange}
              placeholder="exemplo.com.br"
              required
            />
          </div>
          
        <Dialog open={!!createTenancyResponse}>
          <DialogContent 
            className="[&>button]:hidden w-full max-w-md sm:max-w-lg mx-auto overflow-y-auto p-6 sm:p-8">
            <DialogHeader className="relative">
              <DialogTitle>Novo inquilino foi criado com sucesso</DialogTitle>
            </DialogHeader>
            <div className="space-y-8 text-sm">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Id:</strong>
                </p>
                <p className='break-all'>
                  {createTenancyResponse?.id}
                </p>
                <p>
                  <strong>Nome:</strong>
                </p>
                <p className='break-all'>
                  {createTenancyResponse?.name}
                </p>
                <p>
                  <strong>Email do Principal Administrador:</strong>
                </p>
                <p className='break-all'>
                  {createTenancyResponse?.mainAdministratorEmail}
                </p>
                <p>
                  <strong>Chave Padrão de Acesso:</strong>
                </p>
                <p className='break-all'>
                  {createTenancyResponse?.apiKeyDefaultKey}
                </p>
              </div>
              <p className="text-black text-muted-foreground mt-4">
                Copie e salve agora. Esta chave <strong>não será exibida novamente</strong>.
              </p>
            </div>
            <DialogFooter className="pt-4">
              <Button
                onClick={() => {
                  // setGeneratedKey(null);
                  router.push('/admin/tenancies');
                }}
              >
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          

          <div className="pt-4">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto"
            >
              <Save size={16} className="mr-2" />
              {loading ? 'Salvando...' : 'Salvar Inquilino'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenancyForm;
