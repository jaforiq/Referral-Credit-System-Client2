import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (book) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.book._id === book._id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.book._id === book._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { book, quantity: 1 }],
          };
        }),

      removeFromCart: (bookId) =>
        set((state) => ({
          items: state.items.filter((item) => item.book._id !== bookId),
        })),

      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.book._id === bookId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);