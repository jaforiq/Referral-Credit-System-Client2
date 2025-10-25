// import axios, { AxiosInstance, AxiosError } from 'axios';
// import { AuthResponse, ApiResponse, DashboardStats, Referral, Purchase } from '../types';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// class ApiClient {
//   private client: AxiosInstance;

//   constructor() {
//     this.client = axios.create({
//       baseURL: API_URL,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     this.client.interceptors.request.use((config) => {
//       const token = this.getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     this.client.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError) => {
//         if (error.response?.status === 401) {
//           this.removeToken();
//           if (typeof window !== 'undefined') {
//             window.location.href = '/login';
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   private getToken(): string | null {
//     if (typeof window === 'undefined') return null;
//     return localStorage.getItem('token');
//   }

//   private setToken(token: string): void {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token);
//     }
//   }

//   private removeToken(): void {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('token');
//     }
//   }

//   async register(data: {
//     email: string;
//     password: string;
//     name: string;
//     referralCode?: string;
//   }): Promise<AuthResponse> {
//     const response = await this.client.post<AuthResponse>('/auth/register', data);
//     if (response.data.data.token) {
//       this.setToken(response.data.data.token);
//     }
//     return response.data;
//   }

//   async login(data: { email: string; password: string }): Promise<AuthResponse> {
//     const response = await this.client.post<AuthResponse>('/auth/login', data);
//     if (response.data.data.token) {
//       this.setToken(response.data.data.token);
//     }
//     return response.data;
//   }

//   async getProfile(): Promise<ApiResponse> {
//     const response = await this.client.get('/auth/profile');
//     return response.data;
//   }

//   logout(): void {
//     this.removeToken();
//   }

//   async getDashboard(): Promise<ApiResponse<DashboardStats>> {
//     const response = await this.client.get('/referrals/dashboard');
//     return response.data;
//   }

//   async getReferrals(): Promise<ApiResponse<{ referrals: Referral[]; count: number }>> {
//     const response = await this.client.get('/referrals');
//     return response.data;
//   }

//   async validateReferralCode(code: string): Promise<ApiResponse> {
//     const response = await this.client.get(`/referrals/validate/${code}`);
//     return response.data;
//   }

//   async createPurchase(data: {
//     productName: string;
//     amount: number;
//   }): Promise<ApiResponse<{ purchase: Purchase; creditsAwarded: boolean; currentCredits: number }>> {
//     const response = await this.client.post('/purchases', data);
//     return response.data;
//   }

//   async getPurchases(): Promise<ApiResponse<{ purchases: Purchase[]; count: number }>> {
//     const response = await this.client.get('/purchases');
//     return response.data;
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }
// }

// export const api = new ApiClient();

import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, ApiResponse, DashboardStats, Referral, Purchase, Book } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.removeToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    name: string;
    referralCode?: string;
  }): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', data);
    if (response.data.data.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', data);
    if (response.data.data.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async getProfile(): Promise<ApiResponse> {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  logout(): void {
    this.removeToken();
  }

  // Referral endpoints
  async getDashboard(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.client.get('/referrals/dashboard');
    return response.data;
  }

  async getReferrals(): Promise<ApiResponse<{ referrals: Referral[]; count: number }>> {
    const response = await this.client.get('/referrals');
    return response.data;
  }

  async validateReferralCode(code: string): Promise<ApiResponse> {
    const response = await this.client.get(`/referrals/validate/${code}`);
    return response.data;
  }

  // Purchase endpoints
  async createPurchase(data: {
    productName: string;
    amount: number;
  }): Promise<ApiResponse<{ purchase: Purchase; creditsAwarded: boolean; currentCredits: number }>> {
    const response = await this.client.post('/purchases', data);
    return response.data;
  }

  async getPurchases(): Promise<ApiResponse<{ purchases: Purchase[]; count: number }>> {
    const response = await this.client.get('/purchases');
    return response.data;
  }

  // Book endpoints
  async getBooks(params?: { category?: string; search?: string }): Promise<ApiResponse<{ books: Book[]; count: number }>> {
    const response = await this.client.get('/books', { params });
    return response.data;
  }

  async getBookById(id: string): Promise<ApiResponse<{ book: Book }>> {
    const response = await this.client.get(`/books/${id}`);
    return response.data;
  }

  async createBook(data: Omit<Book, '_id'>): Promise<ApiResponse<{ book: Book }>> {
    const response = await this.client.post('/books', data);
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const api = new ApiClient();