
export type PostStatus = 'draft' | 'published';
export type Role = 'RootAdmin' | 'Administrator' | 'Author';


export interface Post {
  id: number;
  title: string;
  content: string; // Pode conter HTML ou texto rico
  excerpt: string;
  image: string;
  author: User;
  authorId: number;
  categories: string[];
  date: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  role: Role;
  email: string;
  createdAt: string;
  updatedAt: string;
}
