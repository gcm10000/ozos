// app/admin/layout.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Users, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');

    if (!auth.isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (auth.passwordChangeRequired) {
      router.push('/admin/change-password');
      return;
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso'
    });
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { label: 'Posts', icon: <FileText size={20} />, path: '/admin/posts' },
    { label: 'Usuários', icon: <Users size={20} />, path: '/admin/users' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
            ))}

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
