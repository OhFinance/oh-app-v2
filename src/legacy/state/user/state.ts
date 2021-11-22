import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import updateVersion from 'state/actions';
import { UpdateGasPrice, UpdateUserEarnViewMode } from './actions';
import { ViewMode } from './types';

export interface UserState {
  account: string | null;
  connector: string | null;
  gasPrice: number | null;
  isAlertDisplayed: boolean;
  isDarkMode: boolean;
  isDrawerOpen: boolean;
  isExactApproval: boolean;
  userEarnViewMode: ViewMode;
}

export const initialState: UserState = {
  account: null,
  connector: null,
  gasPrice: null,
  isAlertDisplayed: true,
  isDarkMode: false,
  isDrawerOpen: false,
  isExactApproval: false,
  userEarnViewMode: ViewMode.TABLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state = initialState;
    },
    toggleAppAlert: (state) => {
      state.isAlertDisplayed = !state.isAlertDisplayed;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleDrawerMode: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    toggleApproval: (state) => {
      state.isExactApproval = !state.isExactApproval;
    },
    updateGasPrice: (state, action: PayloadAction<UpdateGasPrice>) => {
      state.gasPrice = action.payload.gasPrice;
    },
    updateUserEarnViewMode: (state, action: PayloadAction<UpdateUserEarnViewMode>) => {
      state.userEarnViewMode = action.payload.userEarnViewMode;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(updateVersion, (state) => {
      // add variables
      if (state.isAlertDisplayed === undefined) {
        state.isAlertDisplayed = initialState.isAlertDisplayed;
      }
    }),
});

export const {
  clearUser,
  toggleAppAlert,
  toggleDarkMode,
  toggleDrawerMode,
  toggleApproval,
  updateGasPrice,
  updateUserEarnViewMode,
} = userSlice.actions;

export default userSlice.reducer;
