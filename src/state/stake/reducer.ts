import { createSlice } from '@reduxjs/toolkit';

export enum Field {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export interface StakeState {
  readonly [Field.DEPOSIT]: {
    readonly typedValue: string;
    // Normal token
    readonly currencyId: string | undefined | null;
  };
  readonly [Field.WITHDRAW]: {
    readonly typedValue: string;
    // OH Wrapped Token
    readonly currencyId: string | undefined | null;
  };
}

const initialState: StakeState = {
  [Field.DEPOSIT]: {
    typedValue: '',

    // REDUNDANT NOW: when more staking pools are introduced this will hold the selected currency.
    currencyId: null,
  },
  [Field.WITHDRAW]: {
    typedValue: '',
    // REDUNDANT NOW: when more staking pools are introduced this will hold the selected currency.
    currencyId: null,
  },
};
const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    typeInput(
      state,
      action: {
        type: string;
        payload: { field: Field; typedValue: string };
      }
    ) {
      const { field, typedValue } = action.payload;
      state[field] = { ...state[field], typedValue };
    },
  },
});

export const { typeInput } = stakeSlice.actions;

export default stakeSlice.reducer;
