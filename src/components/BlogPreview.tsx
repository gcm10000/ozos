import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BlogPreview = () => {
  // Posts recentes seriam carregados de um backend real
  const recentPosts = [
    {
      id: 1,
      title: 'Como criar um portfólio impressionante',
      excerpt: 'Aprenda as melhores práticas para criar um portfólio que destaque suas habilidades e projetos.',
      date: '15 Abr 2025',
      author: 'Equipe Ozos',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Tendências de design para 2025',
      excerpt: 'Descubra as tendências de design que estão moldando a web neste ano e como implementá-las.',
      date: '10 Abr 2025',
      author: 'Equipe Ozos',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Otimizando seu site para motores de busca',
      excerpt: 'Estratégias essenciais para melhorar o ranqueamento do seu site nos motores de busca.',
      date: '5 Abr 2025',
      author: 'Equipe Ozos',
      image: '/placeholder.svg'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-heading reveal">Nosso Blog</h2>
          <p className="section-subheading reveal">
            Dicas, tutoriais e insights sobre design, desenvolvimento web e tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          {recentPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date} • {post.author}</p>
                <h3 className="text-xl font-bold text-ozos-navy mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="text-ozos-blue font-medium inline-flex items-center">
                  Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button asChild variant="outline" className="border-ozos-blue text-ozos-blue hover:bg-ozos-blue/10">
            <Link href="/blog">
              Ver todos os artigos <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
