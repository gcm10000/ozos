// app/admin/apikeys/page.tsx

'use server';

import { FilePenLine, Eye, Trash2, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ApiKeyDto, apiKeyService } from '@/services/serverside/apiKeyService';
import { redirect } from 'next/navigation';
import { authService } from '@/services/serverside';
import { ApiKeyRevokeButton } from '../components/ApiKeyRevokeButton';

interface Props {
  searchParams?: {
    search?: string;
    tenancyId: string;
  };
}

const ApiKeysList = async ({ searchParams }: Props) => {
  const search = searchParams?.search || '';
  const data = await apiKeyService.getApiKeys(search);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">API Keys</h1>
        <Button asChild>
          <Link href={`/admin/apikeys/new`}>
            <PlusCircle className="mr-2" size={16} />
            Nova API Key
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form method="get" className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              name="search"
              placeholder="Buscar chaves pelo nome..."
              defaultValue={search}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Nome</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Chave</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Criada em</th>
                <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data
                  .map((key: ApiKeyDto) => (
                    <tr key={key.key} className="border-b">
                      <td className="py-3 text-sm font-mono text-ellipsis overflow-hidden">{key.name}</td>
                      <td className="py-3 text-sm font-mono text-ellipsis overflow-hidden">{key.key}</td>
                      <td className="py-3 text-gray-600 text-sm">{new Date(key.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/apikeys/${key.id}`}>
                            <Eye size={16} />
                        </Link>
                        </Button>
                        <ApiKeyRevokeButton id={key.id} />
                    </div>
                    </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhuma chave encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysList;
