import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import axios from 'axios';

interface AuthContextType { 
  user: User | null; 
  login: (token: string, user: User) => void; 
  logout: () => void;
  cart: {product: any, quantity: number}[];
  addToCart: (product: any) => void;
  reduceQuantity: (productId: number) => void;
  clearCart: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(storedUser);
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !localStorage.getItem('user')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('http://localhost:8080/api/users/me')
        .then(res => {
           const me = res.data.data;
           const userRoles = me.roles?.map((r: any) => r.name) || ['ROLE_USER'];
           const u = { id: me.id, username: me.username, roles: userRoles };
           localStorage.setItem('user', JSON.stringify(u));
           setUser(u);
        })
        .catch(() => {
           logout();
        });
    }
  }, []);

  const [cart, setCart] = useState<{product: any, quantity: number}[]>([]);

  const addToCart = (product: any) => {
    const existing = cart.find(c => c.product.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

    const reduceQuantity = (productId: number) => {
    const existing = cart.find(c => c.product.id === productId);
    if (existing) {
      if (existing.quantity === 1) {
        setCart(cart.filter(c => c.product.id !== productId));
      } else {
        setCart(cart.map(c => c.product.id === productId ? { ...c, quantity: c.quantity - 1 } : c));
      }
    }
  };

  const clearCart = () => setCart([]);

  const login = (token: string, user: User) => { 
    localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user)); 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user); 
  };

  const logout = () => { 
    localStorage.removeItem('token'); localStorage.removeItem('user'); 
    delete axios.defaults.headers.common['Authorization'];
    setUser(null); 
    clearCart();
  };

  return <AuthContext.Provider value={{ user, login, logout, cart, addToCart, reduceQuantity, clearCart }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within AuthProvider'); return context; };




