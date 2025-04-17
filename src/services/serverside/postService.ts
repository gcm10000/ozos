
import { BlogApiTenancyId } from '@/config/api';
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
    return apiService.get<PostListResponse>(`/posts`, true, params);
  }

  /**
   * Obtém a lista de posts com paginação e filtros
   */
  async getPublicPosts(params?: PostListParams): Promise<PostListResponse> {
    return apiService.get<PostListResponse>(`/${BlogApiTenancyId}/posts`, false, params);
  }

  /**
   * Obtém um post pelo ID
   */
  async getPostById(id: number): Promise<Post> {
    return apiService.get<Post>(`/posts/${id}`);
  }

  /**
   * Obtém um post pelo Slug
   */
  async getPostBySlug(slug: string) {
    return apiService.get<Post>(`/posts/slug/${slug}`);
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
}

export const postService = new PostService();