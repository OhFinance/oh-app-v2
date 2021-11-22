import { ToastContainer } from 'components/Toast';
import useToast from 'hooks/useToast';

export const ToastListener = () => {
  const { toasts, remove } = useToast();

  const handleRemove = (id: string) => remove(id);

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />;
};
