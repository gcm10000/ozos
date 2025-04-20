"use server"
import { FilePenLine, Eye, Trash2, PlusCircle, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { postService } from '@/services/serverside';
import DeletePostButton from '../components/DeletePostButton';

interface PostListProps {
  searchParams?: {
    search?: string;
    status?: 'all' | 'published' | 'draft';
    page?: string;
  };
}

const PostList = async ({ searchParams }: PostListProps) => {
  const { search = '', status = 'all', page = '1' } = await searchParams || {};
  const currentPage = parseInt(page || '1', 10);
  const pageSize = 10;

  const { data, totalPages } = await postService.getPosts({ 
    page: 1, 
    limit: pageSize, 
    search: search.toLowerCase(), 
    status: status === 'all' ? undefined : status  
  });

  function ensureHttpScheme(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  }  

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">Gerenciar Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2" size={16} />
            Novo Post
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form method="get" className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              name="search"
              placeholder="Buscar posts..."
              defaultValue={search}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          </div>

          <div className="flex gap-2">
            {['all', 'published', 'draft'].map((s) => (
              <Button
                key={s}
                type="submit"
                name="status"
                value={s}
                variant={status === s ? 'default' : 'outline'}
                size="sm"
              >
                {s === 'all' ? 'Todos' : s === 'published' ? 'Publicados' : 'Rascunhos'}
              </Button>
            ))}
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Título</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Status</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Data</th>
                <th className="text-left py-3 text-gray-500 font-medium text-sm">Autor</th>
                <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((post: any) => (
                  <tr key={post.id} className="border-b">
                    <td className="py-3">{post.title}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 text-gray-600">{post.author}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <FilePenLine size={16} />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/posts/${post.id}`}>
                            <Eye size={16} />
                          </Link>
                        </Button>
                        {post.status === 'published' ? (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={ensureHttpScheme(post.externalLink)} target="_blank">
                            <ExternalLink size={16} />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" disabled>
                          <ExternalLink size={16} />
                        </Button>
                      )}
                        <DeletePostButton id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum post encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
          <div className="mt-12 flex justify-end gap-4">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const query = new URLSearchParams({
                ...(search ? { search } : {}),
                ...(status !== 'all' ? { status } : {}),
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

export default PostList;
