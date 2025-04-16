
import { apiService } from './apiService';
import { Post, PostStatus } from '@/types/blog';

export interface PostListParams {
  page?: number;
  limit?: number;
  status?: PostStatus;
  search?: string;
  category?: string;
}

export interface PostListResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  authorId: number;
  categories: string[];
  status: PostStatus;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  image?: string;
  categories?: string[];
  status?: PostStatus;
}

export interface DeletePostResponse {
  success: boolean;
  message: string;
}

export interface UpdatePostStatusRequest {
  status: PostStatus;
}

export interface UpdatePostStatusResponse {
  id: number;
  status: PostStatus;
  updatedAt: string;
}

class PostService {
  /**
   * Obtém a lista de posts com paginação e filtros
   */
  async getPosts(params?: PostListParams): Promise<PostListResponse> {
    return apiService.get<PostListResponse>(`/posts}`, true, params);
  }

  /**
   * Obtém um post pelo ID
   */
  async getPostById(id: number): Promise<Post> {
    return apiService.get<Post>(`/posts/${id}`);
  }

  /**
   * Cria um novo post
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
    return apiService.post<Post>('/posts', true, postData);
  }

  /**
   * Atualiza um post existente
   */
  async updatePost(id: number, postData: UpdatePostRequest): Promise<Post> {
    return apiService.put<Post>(`/posts/${id}`, true, postData);
  }


  async createPostForm(formData: FormData) {
    return apiService.post<Post>('/posts', true, formData);
    
    
    // const res = await fetch('/posts', {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!res.ok) throw new Error('Erro ao criar post');
    // return await res.json();
  }
  
  async updatePostForm(id: number, formData: FormData) {
    return apiService.put<Post>(`/posts/${id}`, true, formData);

    // const res = await fetch(`/posts/${id}`, {
    //   method: 'PUT',
    //   body: formData,
    // });
  
    // if (!res.ok) throw new Error('Erro ao atualizar post');
    // return await res.json();
  }

  /**
   * Exclui um post
   */
  async deletePost(id: number): Promise<DeletePostResponse> {
    return apiService.delete<DeletePostResponse>(`/posts/${id}`);
  }

  /**
   * Atualiza apenas o status de um post
   */
  async updatePostStatus(id: number, status: PostStatus): Promise<UpdatePostStatusResponse> {
    return apiService.patch<UpdatePostStatusResponse>(`/posts/${id}/status`, true, { status });
  }

  async getStats() {
    return apiService.get<Post>(`/posts/stats`);
  }

  async getRecent() {
    return apiService.get<Post>(`/posts/recent`);
  }
}

export const postService = new PostService();
