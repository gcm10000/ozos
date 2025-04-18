'use server';

import { FilePenLine, Eye, Trash2, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { tenancyService } from '@/services/serverside/tenancyService'; // Crie um serviço SSR similar ao userService
import { ApiError } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

interface Props {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

const TenancyList = async ({ searchParams }: Props) => {
  const { search = '', page = '1' } = searchParams || {};
  const currentPage = parseInt(page || '1', 10);
  const pageSize = 10;

  const getData = async () => {
    try {
      const response = await tenancyService.getTenancies({
        page: currentPage,
        limit: pageSize,
        search: search.toLowerCase(),
      });
      return response;
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 403) {
        redirect('/403');
      }
      throw err;
    }
  };

  const { data, totalPages } = await getData();

  console.log('>>>>>>>>>>>>>>>data', data);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">Gerenciar Inquilinos</h1>
        <Button asChild>
          <Link href="/admin/tenancies/new">
            <PlusCircle className="mr-2" size={16} />
            Novo Inquilino
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form method="get" className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              name="search"
              placeholder="Buscar inquilinos..."
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
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Domínio</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Descrição</th>
                <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((tenancy: any) => (
                  <tr key={tenancy.id} className="border-b">
                    <td className="py-3">{tenancy.name}</td>
                    <td className="py-3 text-gray-600">{tenancy.url}</td>
                    <td className="py-3 text-gray-600">{tenancy.description}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/tenancies/${tenancy.id}/edit`}>
                            <FilePenLine size={16} />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/tenancies/${tenancy.id}`}>
                            <Eye size={16} />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Nenhum inquilino encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-end gap-4">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const query = new URLSearchParams({
              ...(search ? { search } : {}),
              page: page.toString(),
            }).toString();

            return (
              <Button
                key={page}
                asChild
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
              >
                <Link href={`/admin/tenancies?${query}`}>{page}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TenancyList;
