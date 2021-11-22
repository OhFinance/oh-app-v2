import { Toast, ToastType } from 'components/Toast/types';
import { kebabCase } from 'lodash';
import { useCallback, useState } from 'react';
import { IToastContext, ToastContext } from './ToastContext';

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToastContext['toasts']>([]);

  const toast = useCallback(
    ({ title, description, type }: Omit<Toast, 'id'>) => {
      setToasts((prevToasts) => {
        const id = kebabCase(title);

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id);

        return [
          {
            id,
            title,
            description,
            type,
          },
          ...currentToasts,
        ];
      });
    },
    [setToasts]
  );

  const toastError = (title: Toast['title'], description?: Toast['description']) => {
    return toast({ title, description, type: ToastType.ERROR });
  };

  const toastInfo = (title: Toast['title'], description?: Toast['description']) => {
    return toast({ title, description, type: ToastType.INFO });
  };

  const toastSuccess = (title: Toast['title'], description?: Toast['description']) => {
    return toast({ title, description, type: ToastType.SUCCESS });
  };

  const toastWarning = (title: Toast['title'], description?: Toast['description']) => {
    return toast({ title, description, type: ToastType.WARNING });
  };

  const clear = () => setToasts([]);

  const remove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        clear,
        remove,
        toastError,
        toastInfo,
        toastSuccess,
        toastWarning,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
