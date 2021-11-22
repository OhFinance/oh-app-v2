import { ReactNode } from 'react';

export enum ToastType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: ReactNode;
}

export interface ToastContainerProps {
  toasts: Toast[];
  spacing?: number;
  duration?: number;
  onRemove: (id: string) => void;
}

export interface ToastProps {
  toast: Toast;
  onRemove: ToastContainerProps['onRemove'];
  duration: number;
  style: Partial<CSSStyleDeclaration>;
}
