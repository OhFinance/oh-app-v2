import { Toast } from 'components/Toast/types';
import { createContext } from 'react';

type ToastSignature = (title: Toast['title'], description?: Toast['description']) => void;

export interface IToastContext {
  toasts: Toast[];
  clear: () => void;
  remove: (id: string) => void;
  toastError: ToastSignature;
  toastInfo: ToastSignature;
  toastSuccess: ToastSignature;
  toastWarning: ToastSignature;
}

export const ToastContext = createContext<IToastContext>(undefined as any);
