import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  toggleDemoAdmin: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const DEFAULT_ADMIN: User = {
  id: 'admin_1',
  name: 'Sneha Gupta (CA Finalist Admin)',
  email: 'admin@snehagupta.com',
  phone: '+91 98765 43210',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

const DEFAULT_STUDENT: User = {
  id: 'student_1',
  name: 'Aarav Patel',
  email: 'aarav.student@gmail.com',
  phone: '+91 91234 56789',
  role: 'student',
  attempt: 'CA Inter Sept 2026',
  college: 'Mumbai University',
  preparationLevel: '50% Preparation Done',
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sneha_app_user');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sneha_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sneha_app_user');
    }
  }, [user]);

  const login = async (email: string, password?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Check if admin email or password
    if (email.toLowerCase().includes('admin') || password === 'admin123') {
      setUser(DEFAULT_ADMIN);
      return { success: true, message: 'Logged in successfully as Admin!' };
    }

    const existingUsersRaw = localStorage.getItem('sneha_app_all_users');
    const allUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [DEFAULT_STUDENT, DEFAULT_ADMIN];
    const found = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      setUser(found);
      return { success: true, message: `Welcome back, ${found.name}!` };
    }

    // Default auto-create student user if not found for seamless testing
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('sneha_app_all_users', JSON.stringify([...allUsers, newUser]));
    setUser(newUser);
    return { success: true, message: 'Account created and logged in!' };
  };

  const register = async (name: string, email: string, phone: string, role: UserRole = 'student') => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newUser: User = {
      id: `u_${Date.now()}`,
      name,
      email,
      phone,
      role,
      createdAt: new Date().toISOString(),
    };

    const existingUsersRaw = localStorage.getItem('sneha_app_all_users');
    const allUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [DEFAULT_STUDENT, DEFAULT_ADMIN];
    
    localStorage.setItem('sneha_app_all_users', JSON.stringify([...allUsers, newUser]));
    setUser(newUser);
    return { success: true, message: 'Registration successful!' };
  };

  const logout = () => {
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}`,
    };
  };

  const toggleDemoAdmin = () => {
    if (user?.role === 'admin') {
      setUser(DEFAULT_STUDENT);
    } else {
      setUser(DEFAULT_ADMIN);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        forgotPassword,
        toggleDemoAdmin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
