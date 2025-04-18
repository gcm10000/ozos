'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Users, Building, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/clientside';
import { Role } from '@/app/types/blog';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< currentUser (client side)', user);
    setCurrentUser(user);
    setIsMounted(true);
  }, []);

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
    { label: 'Inquilinos', icon: <Building size={20} />, path: '/admin/tenancies', availableRoles: ['RootAdmin'] }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isMounted || !currentUser) {
    // ou poderia exibir um spinner, skeleton, etc
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-ozos-navy p-4 text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">Painel Admin</h1>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        bg-ozos-navy text-white w-full md:w-64 flex-shrink-0 
        ${sidebarOpen ? 'block' : 'hidden'} md:block
        md:h-screen md:sticky md:top-0
      `}>
        <div className="p-4 border-b border-blue-800">
          <h1 className="font-bold text-xl hidden md:block">Painel Admin</h1>
        </div>

        <nav className="py-4">
          <ul>
            {navItems.map((item, index) => (
              item.availableRoles.includes(currentUser.role) && (
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
              )
            ))}

            {/* Avatar Chip */}
            <li className="px-4 py-3">
              <div className="flex items-center gap-3 bg-ozos-blue/30 rounded-full px-3 py-2">
                <div className="bg-white text-ozos-navy font-bold rounded-full w-8 h-8 flex items-center justify-center uppercase">
                  {currentUser.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <span className="text-sm">{currentUser.name}</span>
              </div>
            </li>

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

      {/* Main Content */}
      <div className="flex-grow">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
