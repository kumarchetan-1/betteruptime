/**
 * Simple Toast Hook - Easy to Understand Version (Fixed)
 * 
 * This version uses React Context to share toast state globally.
 * All components can now show toasts and they'll appear in SimpleToaster.
 */

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ToastVariant = "default" | "destructive" | "success";

export type SimpleToast = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
};

// Create a context to share toast state globally
type ToastContextType = {
  toasts: SimpleToast[];
  showToast: (message: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider component - wraps your app
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<SimpleToast[]>([]);

  const showToast = (message: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: SimpleToast = {
      id,
      title: message.title,
      description: message.description,
      variant: message.variant || "default",
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, clearAll }}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook to use toast in components
export function useSimpleToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useSimpleToast must be used within ToastProvider");
  }
  return context;
}
