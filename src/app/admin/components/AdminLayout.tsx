'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, FileText, Users, Building, LogOut, Menu, X, KeyRound,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { authService, Tenancy, tenancyService } from '@/services/clientside';
import Cookies from 'js-cookie';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { TenancySelect } from './TenancySelect';
import { User } from '@/types/blog';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [openModalChangeTenancy, setOpenModalChangeTenancy] = useState(false);
  const [selectedTenancy, setSelectedTenancy] = useState<Tenancy | null>(null);
  const [otherTenancies, setOtherTenancies] = useState<Tenancy[]>([]);
  const [appliedTenancy, setAppliedTenancy] = useState<Tenancy | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const clientIdFromCookie = Cookies.get('clientId');

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setIsMounted(true);
    fetchTenancy();
  }, []);

  const fetchTenancy = async () => {
    if (!clientIdFromCookie) return;
    const clientId = Cookies.get('clientId');
    const tenancy = await tenancyService.getTenancyById(Number(clientId));
    setAppliedTenancy(tenancy);
  };

  useEffect(() => {
    if (openModalChangeTenancy && otherTenancies.length === 0) {
      const fetchTenancies = async () => {
        const tenancies = await tenancyService.getTenancies({ page: 1, limit: 999 });
        setOtherTenancies(tenancies.data);
        const current = tenancies.data.find(t => t.id.toString() === clientIdFromCookie);
        setSelectedTenancy(current ?? tenancies.data[0]);
      };
      fetchTenancies();
    }
  }, [openModalChangeTenancy]);

  const handleLogout = () => {
    authService.logout();
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso'
    });
    router.push('/admin-login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard', availableRoles: ['RootAdmin', 'Administrator', 'Author'] },
    { label: 'Posts', icon: <FileText size={20} />, path: '/admin/posts', availableRoles: ['RootAdmin', 'Administrator', 'Author'] },
    { label: 'Usuários', icon: <Users size={20} />, path: '/admin/users', availableRoles: ['RootAdmin', 'Administrator', 'Author'] },
    { label: 'Inquilinos', icon: <Building size={20} />, path: '/admin/tenancies', isMainTenancyMandatory: true, availableRoles: ['RootAdmin'] },
    { label: 'Chaves de Acesso', icon: <KeyRound size={20} />, path: '/admin/apikeys', availableRoles: ['RootAdmin', 'Administrator'] }
  ];

  // Verifica se o componente foi montado e se o usuário está carregado
  if (!isMounted || !currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Header Mobile */}
      <div className="md:hidden bg-ozos-navy p-4 text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">Painel Admin</h1>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "bg-ozos-navy text-white w-full md:w-64 flex-shrink-0",
        sidebarOpen ? 'block' : 'hidden', 'md:block md:h-screen md:sticky md:top-0'
      )}>
        <div className="p-4 border-b border-blue-800">
          <h1 className="font-bold text-xl hidden md:block">Painel Admin</h1>
          {currentUser.isMainTenancy && <span className="cursor-pointer select-none" onClick={() => setOpenModalChangeTenancy(true)}>
            {appliedTenancy?.name || "Carregando..."} — Olá, {currentUser.name}
          </span>
          }
          {!currentUser.isMainTenancy && <span>
            {appliedTenancy?.name || "Carregando..."} — Olá, {currentUser.name}
          </span>
          }
        </div>

        {/* Modal de troca de inquilino */}
        <Dialog open={openModalChangeTenancy} onOpenChange={setOpenModalChangeTenancy}>
          <DialogContent className="w-full max-w-md sm:max-w-lg mx-auto overflow-y-auto p-6 sm:p-8 overflow-visible">
            <DialogHeader>
              <DialogTitle>Escolha um Inquilino</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <TenancySelect
                tenancies={otherTenancies}
                selected={selectedTenancy}
                onSelect={setSelectedTenancy}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                disabled={!selectedTenancy}
                onClick={async () => {
                  if (selectedTenancy) {
                    Cookies.set('clientId', selectedTenancy.id.toString(), { secure: true, expires: 7 });
                    setOpenModalChangeTenancy(false);
                    await fetchTenancy(); // garante que vem da API com isMainTenancy atualizado
                    router.refresh();
                    toast({
                      title: 'Inquilino atualizado!',
                      description: `Você mudou para o inquilino: ${selectedTenancy.name}`,
                    });
                  }
                }}
              >
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <nav className="py-4">
          <ul>
            {navItems.map((item, index) => {
              const isAllowedRole = item.availableRoles.includes(currentUser.role);
              const passesMainTenancyCheck = item.isMainTenancyMandatory 
                ? appliedTenancy?.isMainTenancy // Verifica se a tenancy atual possui isMainTenancy como true
                : true; // Se não for obrigatório, passa direto

              // Renderiza os itens do menu que passaram na verificação de permissões e tenancy
              if (isAllowedRole && passesMainTenancyCheck) {
                return (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-ozos-blue transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              }

              return null;
            })}

            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-ozos-blue transition-colors text-left"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo */}
      <div className="flex-grow">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
