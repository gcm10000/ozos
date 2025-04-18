import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { postService } from '@/services/serverside';
import buildUrl from '@/app/helpers/buildURL';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}


export default async function BlogPost({ params }: BlogPostPageProps) {
  
  const { slug } = await params;
  const post = await postService.getPostBySlug(slug);
  const imageUrl = buildUrl(post.image);
  console.log(post);
  if (!post) {
    return notFound();
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow my-16 py-16">
        <article className="container max-w-4xl mx-auto">
          <Link href="/blog" passHref>
            <div className="inline-flex items-center text-ozos-blue mb-8 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para o blog
            </div>
          </Link>
          <img
            src={imageUrl === ''  ? '/placeholder.svg' : imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />

          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category: string) => (
              <span key={category} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>

          <p className="text-gray-500 mb-4">
            {new Date(post.date).toLocaleDateString('pt-BR')} • {post.author}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-ozos-navy mb-6">
            {post.title}
          </h1>

          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
