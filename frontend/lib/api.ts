/**
 * API Client for Flask Backend
 *
 * Important performance notes:
 * - On the server (Server Components), we fetch with `next: { revalidate: 3600 }`
 *   so Vercel caches the response for 1 hour at the edge. This means after the
 *   first request, the API is no longer in the critical render path.
 * - Every method has a static fallback. If the API is cold or unreachable,
 *   pages still render with bundled data instead of showing skeletons forever.
 * - Set NEXT_PUBLIC_API_URL to an absolute URL (e.g. https://your-backend.vercel.app/api)
 *   so server-side fetch works during build/SSR.
 */

import {
  STATIC_PROJECTS,
  STATIC_PUBLICATIONS,
  STATIC_EXPERIENCES,
  STATIC_EDUCATION,
  STATIC_SKILLS,
  STATIC_COURSES,
  STATIC_BLOG_POSTS,
} from './static-data';

// Resolve absolute base URL for server-side fetches.
// Browser-side relative paths still work via the Next.js rewrite.
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser — relative URL handled by next.config.js rewrites
    return process.env.NEXT_PUBLIC_API_URL || '/api';
  }
  // Server — must be absolute
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.startsWith('http')) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Vercel deployment URL fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  // Local dev
  return 'http://localhost:5000/api';
}

const API_BASE_URL = getBaseUrl();

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

interface FetchOptions extends RequestInit {
  // Next.js-specific cache hints
  next?: { revalidate?: number | false; tags?: string[] };
}

const DEFAULT_REVALIDATE = 3600; // 1 hour - cached at the edge on Vercel
const FETCH_TIMEOUT_MS = 4000; // hard cap so we fall back to static data quickly

async function safeFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T> | null> {
  const url = `${API_BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Default to ISR caching unless caller overrides
      next: options.next ?? { revalidate: DEFAULT_REVALIDATE },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ApiResponse<T>;
  } catch (error) {
    clearTimeout(timeout);
    // Silent fail — caller falls back to static data
    if (process.env.NODE_ENV === 'development') {
      console.warn(`API fetch failed for ${endpoint}:`, error);
    }
    return null;
  }
}

class ApiClient {
  // Experiences
  async getExperiences(category?: string): Promise<Experience[]> {
    const params = category ? `?category=${category}` : '';
    const response = await safeFetch<Experience[]>(`/experiences${params}`);
    if (response?.success && response.data) return response.data;
    return category
      ? STATIC_EXPERIENCES.filter((e) => e.category === category)
      : STATIC_EXPERIENCES;
  }

  // Projects
  async getProjects(options?: { featured?: boolean; category?: string }): Promise<Project[]> {
    const params = new URLSearchParams();
    if (options?.featured) params.set('featured', 'true');
    if (options?.category) params.set('category', options.category);
    const query = params.toString() ? `?${params.toString()}` : '';

    const response = await safeFetch<Project[]>(`/projects${query}`);
    if (response?.success && response.data) return response.data;

    let projects = STATIC_PROJECTS;
    if (options?.featured) projects = projects.filter((p) => p.is_featured);
    if (options?.category) projects = projects.filter((p) => p.category === options.category);
    return projects;
  }

  async getProject(slug: string): Promise<Project | null> {
    const response = await safeFetch<Project>(`/projects/${slug}`);
    if (response?.success && response.data) return response.data;
    return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
  }

  // Publications
  async getPublications(status?: string): Promise<Publication[]> {
    const params = status ? `?status=${status}` : '';
    const response = await safeFetch<Publication[]>(`/publications${params}`);
    if (response?.success && response.data) return response.data;
    return status
      ? STATIC_PUBLICATIONS.filter((p) => p.status === status)
      : STATIC_PUBLICATIONS;
  }

  // Courses
  async getCourses(featured?: boolean): Promise<Course[]> {
    const params = featured ? '?featured=true' : '';
    const response = await safeFetch<Course[]>(`/courses${params}`);
    if (response?.success && response.data) return response.data;
    return featured ? STATIC_COURSES.filter((c) => c.is_featured) : STATIC_COURSES;
  }

  // Skills
  async getSkills(): Promise<SkillsGrouped> {
    const response = await safeFetch<SkillsGrouped>('/skills');
    if (response?.success && response.data) return response.data;
    return STATIC_SKILLS;
  }

  // Education
  async getEducation(): Promise<Education[]> {
    const response = await safeFetch<Education[]>('/education');
    if (response?.success && response.data) return response.data;
    return STATIC_EDUCATION;
  }

  // Blog
  async getBlogPosts(
    page: number = 1,
    per_page: number = 10,
    category?: string
  ): Promise<{
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

    const response = await safeFetch<BlogPost[]>(`/blog${query}`);

    if (response?.success && response.data) {
      return {
        posts: response.data,
        pages: response.pagination?.pages ?? 1,
        total: response.pagination?.total ?? response.data.length,
        current_page: response.pagination?.page ?? 1,
      };
    }

    // Fallback to static blog posts
    let posts = STATIC_BLOG_POSTS;
    if (category) posts = posts.filter((p) => p.category === category);
    const total = posts.length;
    const start = (page - 1) * per_page;
    const paged = posts.slice(start, start + per_page);
    return {
      posts: paged,
      pages: Math.max(1, Math.ceil(total / per_page)),
      total,
      current_page: page,
    };
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await safeFetch<BlogPost>(`/blog/${slug}`);
    if (response?.success && response.data) return response.data;
    return STATIC_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }

  // Contact — never cached, no fallback (POST)
  async submitContact(data: ContactForm): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${API_BASE_URL}/contact`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      const json = await response.json();
      return {
        success: !!json.success,
        message: json.message ?? json.data?.message ?? '',
      };
    } catch (err) {
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  }
}

// Export singleton instance
export const api = new ApiClient();
export { ApiClient };