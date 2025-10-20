'use client';

// src/context/ToastContext.tsx
import React, { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  toast: ToastState;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: ToastType = "success", duration = 3000) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), duration);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useCustomToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useCustomToast must be used within a ToastProvider");
  return context;
};
