
// Types for API integration

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  image?: File;
  technologies: string[];
  category: Project['category'];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

// Contact types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CreateContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Experience types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string[];
  technologies: string[];
}

// Skill types
export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  field?: string;
}

// Dashboard types
export interface DashboardStats {
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalViews: number;
  totalSkills: number;
}
