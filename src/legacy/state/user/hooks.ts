import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import {
  toggleAppAlert,
  toggleDarkMode,
  toggleDrawerMode,
  updateUserEarnViewMode,
  toggleApproval,
} from './state';
import { ViewMode } from './types';

export const useAlertManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isAlertDisplayed = useSelector<AppState, AppState['user']['isAlertDisplayed']>(
    (state) => state.user.isAlertDisplayed
  );

  const toggleAlert = useCallback(() => {
    dispatch(toggleAppAlert());
  }, [dispatch]);

  return [isAlertDisplayed, toggleAlert];
};

export const useGasPrice = () => {};

export const useGasPriceManager = () => {};

export const useDrawerManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector<AppState, AppState['user']['isDrawerOpen']>(
    (state) => state.user.isDrawerOpen
  );

  const toggleDrawer = useCallback(() => {
    dispatch(toggleDrawerMode());
  }, [dispatch]);

  return [isDrawerOpen, toggleDrawer];
};

export const useThemeManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector<AppState, AppState['user']['isDarkMode']>(
    (state) => state.user.isDarkMode
  );

  const toggleTheme = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  return [isDark, toggleTheme];
};

export const useApprovalManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isExactApproval = useSelector<AppState, AppState['user']['isExactApproval']>(
    (state) => state.user.isExactApproval
  );

  const toggleExactApproval = useCallback(() => {
    dispatch(toggleApproval());
  }, [dispatch]);

  return [isExactApproval, toggleExactApproval];
};

export const useUserEarnViewMode = (): [ViewMode, (viewMode: ViewMode) => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const userEarnViewMode = useSelector<AppState, AppState['user']['userEarnViewMode']>(
    (state) => state.user.userEarnViewMode
  );

  const setUserEarnViewMode = useCallback(
    (viewMode: ViewMode) => {
      dispatch(updateUserEarnViewMode({ userEarnViewMode: viewMode }));
    },
    [dispatch]
  );

  return [userEarnViewMode, setUserEarnViewMode];
};
