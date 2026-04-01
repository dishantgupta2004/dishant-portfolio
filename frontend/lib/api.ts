/**
 * API Client for Flask Backend
 * Handles all API requests to the portfolio backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// ============== Types ==============

export interface Experience {
  id: number;
  title: string;
  company: string;
  company_url: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  highlights: string[];
  technologies: string[];
  category: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  image: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  highlights: string[];
  category: string | null;
  is_featured: boolean;
  order: number;
  start_date: string | null;
  end_date: string | null;
}

export interface Publication {
  id: number;
  title: string;
  authors: string;
  abstract: string | null;
  publication_type: string | null;
  journal: string | null;
  year: number | null;
  doi: string | null;
  pdf_url: string | null;
  status: string | null;
  highlights: string[];
  order: number;
}

export interface Course {
  id: number;
  title: string;
  description: string | null;
  short_description: string | null;
  image: string | null;
  url: string | null;
  price: string | null;
  duration: string | null;
  level: string | null;
  features: string[];
  is_featured: boolean;
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  order: number;
}

export interface SkillsGrouped {
  [category: string]: Skill[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string | null;
  start_year: number | null;
  end_year: number | null;
  gpa: string | null;
  description: string | null;
  order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  category_name: string | null;
  thumbnail: string | null;
  featured_image: string | null;
  tags: string[];
  published: boolean;
  date: string;
  updated_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: SkillsGrouped;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
  pagination?: {
    page: number;
    pages: number;
    total: number;
    has_prev: boolean;
    has_next: boolean;
  };
}

// ============== API Client ==============

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // ============== Public Methods ==============

  // Health check
  async health() {
    return this.fetch<{ status: string; message: string; version: string }>('/');
  }

  // Experiences
  async getExperiences(category?: string): Promise<Experience[]> {
    const params = category ? `?category=${category}` : '';
    const response = await this.fetch<Experience[]>(`/experiences${params}`);
    return response.data;
  }

  async getExperience(id: number): Promise<Experience> {
    const response = await this.fetch<Experience>(`/experiences/${id}`);
    return response.data;
  }

  // Projects
  async getProjects(options?: { featured?: boolean; category?: string }): Promise<Project[]> {
    const params = new URLSearchParams();
    if (options?.featured) params.set('featured', 'true');
    if (options?.category) params.set('category', options.category);
    const query = params.toString() ? `?${params.toString()}` : '';
    
    const response = await this.fetch<Project[]>(`/projects${query}`);
    return response.data;
  }

  async getProject(slug: string): Promise<Project> {
    const response = await this.fetch<Project>(`/projects/${slug}`);
    return response.data;
  }

  // Publications
  async getPublications(status?: string): Promise<Publication[]> {
    const params = status ? `?status=${status}` : '';
    const response = await this.fetch<Publication[]>(`/publications${params}`);
    return response.data;
  }

  // Courses
  async getCourses(featured?: boolean): Promise<Course[]> {
    const params = featured ? '?featured=true' : '';
    const response = await this.fetch<Course[]>(`/courses${params}`);
    return response.data;
  }

  // Skills
  async getSkills(): Promise<SkillsGrouped> {
    const response = await this.fetch<SkillsGrouped>('/skills');
    return response.data;
  }

  // Education
  async getEducation(): Promise<Education[]> {
    const response = await this.fetch<Education[]>('/education');
    return response.data;
  }

  // Blog
  async getBlogPosts(page: number = 1, per_page: number = 10, category?: string): Promise<{
    posts: BlogPost[];
    pages: number;
    total: number;
    current_page: number;
  }> {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('per_page', per_page.toString());
    if (category) params.set('category', category);
    const query = `?${params.toString()}`;
    
    const response = await this.fetch<BlogPost[]>(`/blog${query}`);
    
    return {
      posts: response.data || [],
      pages: response.pagination?.pages || 1,
      total: response.pagination?.total || 0,
      current_page: response.pagination?.page || 1,
    };
  }

  async getBlogPost(slug: string): Promise<BlogPost> {
    const response = await this.fetch<BlogPost>(`/blog/${slug}`);
    return response.data;
  }

  // Profile
  async getProfile(): Promise<Profile> {
    const response = await this.fetch<Profile>('/profile');
    return response.data;
  }

  // Contact
  async submitContact(data: ContactForm): Promise<{ success: boolean; message: string }> {
    const response = await this.fetch<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { success: response.success, message: response.data?.message || '' };
  }
}

// Export singleton instance
export const api = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };