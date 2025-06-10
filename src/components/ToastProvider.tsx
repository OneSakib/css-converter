// components/ToastProvider.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { setToastFunction, ToastOptions } from "@/lib/toast";

interface Toast extends ToastOptions {
  id: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = useCallback((options: ToastOptions) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { ...options, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  useEffect(() => {
    setToastFunction(showToast);
  }, [showToast]);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow text-white text-sm w-72
              ${toast.variant === "success" ? "bg-green-600" :
                toast.variant === "error" ? "bg-red-600" : "bg-gray-800"}
            `}
          >
            <strong className="block font-semibold">{toast.title}</strong>
            {toast.description && (
              <span className="block text-sm mt-1 opacity-90">{toast.description}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
