export interface User {
  id: string;
  email: string;
  name: string;
  referralCode: string;
  credits: number;
  hasPurchased: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface DashboardStats {
  totalReferrals: number;
  convertedReferrals: number;
  totalCredits: number;
  referralLink: string;
  referralCode: string;
}

export interface Referral {
  _id: string;
  referrerId: string;
  referredId: {
    name: string;
    email: string;
    hasPurchased: boolean;
    createdAt: string;
  };
  status: 'pending' | 'converted';
  creditsAwarded: boolean;
  createdAt: string;
}

export interface Purchase {
  _id: string;
  userId: string;
  productName: string;
  amount: number;
  isFirstPurchase: boolean;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

// E-book Store Types
export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  category: string;
  rating: number;
  createdAt?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}