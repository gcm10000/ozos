// app/admin/layout.tsx
import { ReactNode } from "react";
import AdminLayout from "./components/AdminLayout";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { authService } from "@/services/serverside";
import FullScreenLoader from "@/components/FullScreenLoader";
import ClientLayoutWrapper from "./client-layout-wrapper";

export default async function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const isAuth = await authService.isAuthenticated({ cookies });
  if (!isAuth) {
    redirect('/admin-login');
  }
  
  const user = await authService.me();

  if (user?.passwordChangeRequired) {
    redirect('/admin-change-password');
  }
  
  return (
  <>
    <AdminLayout>
        <ClientLayoutWrapper>
            {children}
        </ClientLayoutWrapper>
    </AdminLayout>
  </>
  );
}
