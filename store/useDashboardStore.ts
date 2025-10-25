import { create } from 'zustand';
import { api } from '../lib/api';
import { DashboardStats, Referral, Purchase } from '../types';

interface DashboardState {
  stats: DashboardStats | null;
  referrals: Referral[];
  purchases: Purchase[];
  isLoading: boolean;
  fetchDashboard: () => Promise<void>;
  fetchReferrals: () => Promise<void>;
  fetchPurchases: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  referrals: [],
  purchases: [],
  isLoading: false,

  fetchDashboard: async () => {
    set({ isLoading: true });
    try {
      const response = await api.getDashboard();
      set({
        stats: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchReferrals: async () => {
    try {
      const response = await api.getReferrals();
      set({
        referrals: response?.data?.referrals,
      });
    } catch (error) {
      console.error('Failed to fetch referrals:', error);
    }
  },

  fetchPurchases: async () => {
    try {
      const response = await api.getPurchases();
      set({
        purchases: response?.data?.purchases,
      });
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    }
  },
}));