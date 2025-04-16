'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Save, Send, ArrowLeft, Code, Type } from 'lucide-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { postService } from '@/services/clientside';
import ImageUploader from '@/components/ImageUploader';

const PostForm = () => {
  const { slug } = useParams();
  const isEditing = !!slug;
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '/placeholder.svg',
    status: 'draft',
    categories: [] as string[]
  });

  const [originalImage, setOriginalImage] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (isEditing && !isNaN(Number(slug))) {
        try {
          const existingPost = await postService.getPostById(Number(slug));
          setPost({
            title: existingPost.title,
            excerpt: existingPost.excerpt,
            content: existingPost.content,
            image: existingPost.image || '/placeholder.svg',
            status: existingPost.status as string,
            categories: existingPost.categories || [],
          });
          setOriginalImage(existingPost.image || '/placeholder.svg');
        } catch (error) {
          toast({
            title: "Erro ao carregar post",
            description: "Não foi possível carregar os dados do post.",
            variant: "destructive",
          });
        }
      }
    };

    fetchPost();
  }, [isEditing, slug, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !post.categories.includes(categoryInput.trim())) {
      setPost(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setPost(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const createFormData = async (status: string): Promise<FormData> => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('excerpt', post.excerpt);
    formData.append('content', post.content);
    formData.append('status', status);
  
    post.categories.forEach((cat, index) => {
      formData.append(`categories[${index}]`, cat);
    });
  
    if (!isEditing) {
      formData.append('authorId', '1'); // lógica de autor real
    }
  
    if (!isEditing || post.image !== originalImage) {
      if (post.image.startsWith('http')) {
        // Se for uma URL de imagem, envia a URL
        formData.append('ImageUrl', post.image);
      } else {
        // Caso contrário, é um arquivo de imagem
        const response = await fetch(post.image);
        const blob = await response.blob();
        const extension = getExtensionFromMimeType(blob.type);
        const fileName = `image${extension}`;
        
        console.log('post.image', post.image);
        console.log('filename', fileName);
        formData.append('ImageFile', blob, fileName);
      }
    }
  
    return formData;
  };


  function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
    'image/tiff': '.tiff',
  };

  return mimeMap[mimeType] || '';
}


  const handleSaveDraft = async () => {
    if (!post.title || !post.content || !post.excerpt) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const formData = await createFormData('draft');

      if (isEditing && !isNaN(Number(slug))) {
        await postService.updatePostForm(Number(slug), formData);
      } else {
        await postService.createPostForm(formData);
      }

      toast({
        title: "Rascunho salvo",
        description: "O post foi salvo como rascunho",
      });

      router.push('/admin/posts');
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o rascunho.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!post.title || !post.content || !post.excerpt) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const formData = await createFormData('published');

      if (isEditing && !isNaN(Number(slug))) {
        await postService.updatePostForm(Number(slug), formData);
      } else {
        await postService.createPostForm(formData);
      }

      toast({
        title: "Post publicado",
        description: "O post foi publicado com sucesso"
      });

      router.push('/admin/posts');
    } catch (error) {
      toast({
        title: "Erro ao publicar",
        description: "Não foi possível publicar o post.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (image: string | File) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> image', image);
    if (typeof image === 'string') {
      // Quando o usuário colar uma URL
      setPost(prev => ({ ...prev, image, imageFile: null }));
    } else {
      // Quando o usuário fizer upload de um arquivo
      setPost(prev => ({ ...prev, image: URL.createObjectURL(image), imageFile: image }));
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => router.push('/admin/posts')}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar para a lista
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-ozos-navy">
          {isEditing ? 'Editar Post' : 'Criar Novo Post'}
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft} disabled={loading}>
            <Save size={16} className="mr-2" />
            Salvar Rascunho
          </Button>
          <Button onClick={handlePublish} disabled={loading}>
            <Send size={16} className="mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título*
            </label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Digite o título do post"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Resumo*
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt}
              onChange={handleChange}
              placeholder="Digite um breve resumo do post"
              rows={3}
              required
            />
          </div>

          <ImageUploader imageUrl={post.image} onImageChange={handleImageChange} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categorias
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.categories.map(category => (
                <span
                  key={category}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {category}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-2 text-blue-700 hover:text-blue-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={categoryInput}
                onChange={e => setCategoryInput(e.target.value)}
                placeholder="Adicionar categoria"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
              />
              <Button variant="outline" onClick={handleAddCategory}>
                Adicionar
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Conteúdo*
              </label>
              <div className="flex items-center space-x-2">
                <Type size={16} className={!isHtmlMode ? "text-blue-500" : "text-gray-400"} />
                <Switch
                  checked={isHtmlMode}
                  onCheckedChange={setIsHtmlMode}
                  id="editor-mode"
                />
                <Code size={16} className={isHtmlMode ? "text-blue-500" : "text-gray-400"} />
                <Label htmlFor="editor-mode" className="text-sm">
                  {isHtmlMode ? 'Modo HTML' : 'Editor de Texto Rico'}
                </Label>
              </div>
            </div>

            {isHtmlMode ? (
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Digite o conteúdo do post (suporta HTML)"
                rows={15}
                required
                className="font-mono"
              />
            ) : (
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={post.content}
                onChange={handleQuillChange}
                placeholder="Comece a escrever o conteúdo do post..."
                className="h-80 mb-12"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
