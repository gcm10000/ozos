export type PostStatus = 'draft' | 'published';

export interface Post {
  id: number;
  title: string;
  content: string; // Pode conter HTML ou texto rico
  excerpt: string;
  slug: string;
  image: string;
  author: string;
  authorId: number;
  categories: string[];
  date: string;
  status?: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  posts: number;
  email: string;
  role: 'RootAdmin' | 'Administrator' | 'Author';
  createdAt: string;
  updatedAt: string;
  isMainTenancy: boolean;
  passwordChangeRequired: boolean;  // Adicionando a propriedade
}