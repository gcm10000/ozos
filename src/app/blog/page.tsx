import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { postService } from '@/services/serverside';
import buildUrl from '../helpers/buildURL';
import { publicPostService } from '@/services/serverside/publicPostService';

interface BlogPageProps {
  searchParams: {
    search?: string;
  };
}

async function fetchPosts(search?: string) {
  console.log("Buscando posts com o termo de pesquisa:", search);

  try {
    console.log("Iniciando requisição para obter os posts...");
    
    // Faz a requisição ao serviço de posts
    const response = await publicPostService.getPublicPosts({ search });
    // const response = await postService.getPublicPosts({ search });

    console.log("Posts recebidos com sucesso:", response.data);

    return response.data;  // Retorna os posts recebidos
  } catch (error) {
    console.error("Erro ao obter os posts:", error);
    return [];  // Retorna um array vazio em caso de erro
  }
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const { search } = await searchParams;

  // Atribui posts com o resultado do método fetchPosts
  const posts = await fetchPosts(search);

  if (posts.length === 0) {
    console.log("Nenhum post encontrado para a pesquisa:", search);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-ozos-navy mb-4">Blog Ozos</h1>
            <p className="text-lg text-gray-600">
              Compartilhando conhecimento sobre design, desenvolvimento web e as últimas tendências em tecnologia.
            </p>

            <form className="mt-8 flex items-center w-full max-w-lg mx-auto">
              <Input
                name="search"
                type="text"
                placeholder="Buscar artigos..."
                defaultValue={search}
                className="pr-12"
              />
              <Button type="submit" variant="ghost" size="icon" className="ml-[-40px]">
                <Search className="h-5 w-5 text-gray-500" />
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={post.image !== '' ? buildUrl(post.image) : '/placeholder.svg'} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map(category => (
                      <span key={category} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('pt-BR')} • {post.author}
                  </p>
                  <h3 className="text-xl font-bold text-ozos-navy mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-ozos-blue font-medium inline-flex items-center">
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhum artigo encontrado para sua busca.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
