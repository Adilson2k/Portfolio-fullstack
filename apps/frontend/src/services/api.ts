import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  Project, 
  CreateProjectData, 
  ContactMessage, 
  CreateContactMessage, 
  Experience, 
  Skill, 
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
  ApiError
} from '../types/api';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Token management
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// HTTP client with automatic token handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = getToken();

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'Something went wrong',
          status: response.status,
          field: data.field,
        };
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile<T>(endpoint: string, file: File, additionalData?: any): Promise<ApiResponse<T>> {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const config: RequestInit = {
      method: 'POST',
      body: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}

// Initialize API client
const apiClient = new ApiClient(API_BASE_URL);

// Authentication services
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.success && response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    if (response.success && response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      removeToken();
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    if (response.success && response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!getToken();
  }
};

// Project services
export const projectService = {
  async getProjects(page = 1, limit = 10, category?: string): Promise<PaginatedResponse<Project>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (category && category !== 'all') {
      params.append('category', category);
    }

    const response = await apiClient.get<Project[]>(`/projects?${params}`);
    return response as PaginatedResponse<Project>;
  },

  async getProject(id: string): Promise<Project> {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async createProject(projectData: CreateProjectData): Promise<Project> {
    const response = await apiClient.post<Project>('/projects', projectData);
    return response.data;
  },

  async updateProject(id: string, projectData: Partial<CreateProjectData>): Promise<Project> {
    const response = await apiClient.put<Project>(`/projects/${id}`, projectData);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },

  async uploadProjectImage(projectId: string, image: File): Promise<string> {
    const response = await apiClient.uploadFile<{ imageUrl: string }>(`/projects/${projectId}/image`, image);
    return response.data.imageUrl;
  }
};

// Contact services
export const contactService = {
  async sendMessage(message: CreateContactMessage): Promise<ContactMessage> {
    const response = await apiClient.post<ContactMessage>('/contact', message);
    return response.data;
  },

  async getMessages(page = 1, limit = 10): Promise<PaginatedResponse<ContactMessage>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await apiClient.get<ContactMessage[]>(`/contact?${params}`);
    return response as PaginatedResponse<ContactMessage>;
  },

  async markAsRead(id: string): Promise<ContactMessage> {
    const response = await apiClient.put<ContactMessage>(`/contact/${id}/read`);
    return response.data;
  },

  async deleteMessage(id: string): Promise<void> {
    await apiClient.delete(`/contact/${id}`);
  }
};

// Experience services
export const experienceService = {
  async getExperiences(): Promise<Experience[]> {
    const response = await apiClient.get<Experience[]>('/experience');
    return response.data;
  },

  async createExperience(experience: Omit<Experience, 'id'>): Promise<Experience> {
    const response = await apiClient.post<Experience>('/experience', experience);
    return response.data;
  },

  async updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
    const response = await apiClient.put<Experience>(`/experience/${id}`, experience);
    return response.data;
  },

  async deleteExperience(id: string): Promise<void> {
    await apiClient.delete(`/experience/${id}`);
  }
};

// Skill services
export const skillService = {
  async getSkills(): Promise<Skill[]> {
    const response = await apiClient.get<Skill[]>('/skills');
    return response.data;
  },

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const response = await apiClient.post<Skill>('/skills', skill);
    return response.data;
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    const response = await apiClient.put<Skill>(`/skills/${id}`, skill);
    return response.data;
  },

  async deleteSkill(id: string): Promise<void> {
    await apiClient.delete(`/skills/${id}`);
  }
};

// Dashboard services
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }
};

// Export token management utilities
export { getToken, setToken, removeToken };
