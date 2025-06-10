export type ToastVariant = "success" | "error" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

type ToastCallback = (options: ToastOptions) => void;

let showToastFn: ToastCallback | null = null;

export const setToastFunction = (fn: ToastCallback) => {
  showToastFn = fn;
};

export const toast = (options: ToastOptions) => {
  if (showToastFn) {
    showToastFn(options);
  } else {
    console.warn("Toast system not initialized");
  }
};
