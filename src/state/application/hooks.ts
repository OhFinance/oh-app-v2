import { useCallback } from 'react';
import { AlertProps } from '~/components/Alert';
import { useActiveWeb3React } from '~/hooks/web3';
import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addAlert, ApplicationModal, removeAlert, setOpenModal } from './reducer';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

export function useAddAlertCallback() {
  const dispatch = useAppDispatch();

  return useCallback(
    (key: string | null, props: AlertProps, removeAfterMs?: number) => {
      dispatch(addAlert({ key, props, removeAfterMs }));
    },
    [dispatch]
  );
}

export function useAlerts() {
  return useAppSelector((state) => state.application.alertList);
}

export function useRemoveAlertCallback() {
  const dispatch = useAppDispatch();
  return useCallback((key: string) => {
    dispatch(removeAlert({ key }));
  }, []);
}
