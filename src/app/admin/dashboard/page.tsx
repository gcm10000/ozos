import {
  FileText,
  Users,
  Eye,
  FilePenLine,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dashboardService } from '@/services/serverside/dashboardService'; // <-- versão server-side
import { DashboardStats, DashboardRecent } from '@/services/clientside/dashboardService';

interface DashboardProps {
  postStats: DashboardStats;
  recentPosts: DashboardRecent['posts'];
  recentUsers: DashboardRecent['users'];
}

export default async function Dashboard() {

    const postStats = await dashboardService.getStats();
    const { posts, users } = await dashboardService.getRecent();

  const stats = [
    {
      title: 'Posts Publicados',
      value: postStats.publishedPosts,
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: 'Posts em Rascunho',
      value: postStats.draftPosts,
      icon: <FilePenLine size={24} className="text-yellow-500" />
    },
    {
      title: 'Usuários',
      value: postStats.totalUsers,
      icon: <Users size={24} className="text-green-500" />
    },
    {
      title: 'Visualizações',
      value: postStats.totalViews,
      icon: <Eye size={24} className="text-purple-500" />
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2" size={16} />
            Novo Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-ozos-navy">Posts Recentes</h2>
            <Button variant="outline" asChild size="sm">
              <Link href="/admin/posts">Ver Todos</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Título</th>
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Status</th>
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Data</th>
                  <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-ozos-navy">Usuários Recentes</h2>
            <Button variant="outline" asChild size="sm">
              <Link href="/admin/users">Ver Todos</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Nome</th>
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Usuário</th>
                  <th className="text-left py-3 text-gray-500 font-medium text-sm">Função</th>
                  <th className="text-right py-3 text-gray-500 font-medium text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3 text-gray-600">{user.username}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Administrator'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'Administrator' ? 'Administrador' : 'Autor'}
                      </span>
                    </td>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};