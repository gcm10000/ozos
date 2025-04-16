import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/shared/BackButton";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-red-100 mb-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-gray-600 mb-6">
            Se você acha que isso é um erro, entre em contato com o suporte.
          </p>
          <div className="space-y-3 w-full">
            <BackButton />
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Ir para Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
