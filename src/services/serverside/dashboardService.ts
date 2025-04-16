import { apiService } from "./apiService";

export interface DashboardStats {
  publishedPosts: number;
  draftPosts: number;
  totalUsers: number;
  totalViews: number;
}

export interface RecentPost {
  id: number;
  title: string;
  status: string;
  createdAt: string;
}

export interface RecentUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardRecent {
  posts: RecentPost[];
  users: RecentUser[];
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiService.get<DashboardStats>('/dashboard/stats');
    return response;
  },

  async getRecent(): Promise<DashboardRecent> {
    const response = await apiService.get<DashboardRecent>('/dashboard/recent');
    return response;
  }
};
