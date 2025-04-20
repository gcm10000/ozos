
import { publicApiService } from './publicApiService';
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

class PublicPostService {
  /**
   * Obtém a lista de posts com paginação e filtros
   */
  async getPublicPosts(params?: PostListParams): Promise<PostListResponse> {
    return publicApiService.get<PostListResponse>('/posts', true, params);
  }

  /**
   * Obtém um post pelo Slug
   */
  async getPostBySlug(slug: string) {
    return publicApiService.get<Post>(`/posts/slug/${slug}`);
  }
}

export const publicPostService = new PublicPostService();