import { FilePenLine, Eye, Trash2, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { userService } from '@/services/serverside/userService'; // SSR version
import DeleteUserButton from '@/app/admin/components/DeleteUserButton'; // SSR version
import { ApiError } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

interface Props {
  searchParams?: {
    search?: string;
  };
}

const UserList = async ({ searchParams }: Props) => {
  const { search = '', page = '1' } = await searchParams as any;
  const currentPage = parseInt(page || '1', 10);
  const pageSize = 10;

  const getData = async () => {
    try {
      const response = await userService.getUsers({ page: 1, limit: pageSize, search: search.toLowerCase()  });
      return response;
    } catch (err: any) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err);
      if (err instanceof ApiError && (err as ApiError).statusCode === 403) {
        redirect('/403');
      }
      throw err;
    }
  }

  const { data, totalPages } = await getData();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">Gerenciar Usuários</h1>
        <Button asChild>
          <Link href="/admin/users/new">
            <PlusCircle className="mr-2" size={16} />
            Novo Usuário
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form method="get" className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              name="search"
              placeholder="Buscar usuários..."
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
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Email</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Função</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Posts</th>
                <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user: any) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3 text-gray-600">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Administrator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'Administrator' ? 'Administrador' : 'Autor'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">{user.posts}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/users/${user.id}/edit`}>
                            <FilePenLine size={16} />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/users/${user.id}`}>
                            <Eye size={16} />
                          </Link>
                        </Button>
                        <DeleteUserButton id={user.id} posts={user.posts} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum usuário encontrado.
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
                  <Link href={`/admin/posts?${query}`}>{page}</Link>
                </Button>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default UserList;
