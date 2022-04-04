import { createSlice, nanoid } from '@reduxjs/toolkit';
import { AlertProps } from '~/components/Alert';
import { DEFAULT_TXN_DISMISS_MS } from '~/constants/misc';

export type PopupContent = {
  txn: {
    hash: string;
  };
};

export enum ApplicationModal {
  WALLET,
  DEPOSIT,
  WITHDRAW,
  NETWORK_SELECTOR,
}

type Alert = { props: AlertProps; key: string; removeAfterMs: number | null; show: boolean };
export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly chainId: number | null;
  readonly implements3085: boolean;
  readonly openModal: ApplicationModal | null;
  readonly alertList: Alert[];
}

const initialState: ApplicationState = {
  blockNumber: {},
  chainId: null,
  implements3085: false,
  openModal: null,
  alertList: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload;
      state.chainId = chainId;
    },
    updateBlockNumber(state, action) {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    },
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    addAlert(state, { payload: { props, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }) {
      state.alertList = (
        key ? state.alertList.filter((alert) => alert.key !== key) : state.alertList
      ).concat([
        {
          key: key || nanoid(),
          props,
          show: true,
          removeAfterMs,
        },
      ]);
    },

    removeAlert(state, { payload: { key } }) {
      state.alertList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    },
    setImplements3085(state, { payload: { implements3085 } }) {
      state.implements3085 = implements3085;
    },
  },
});

export const {
  addAlert,
  updateChainId,
  updateBlockNumber,
  setOpenModal,
  removeAlert,
  setImplements3085,
} = applicationSlice.actions;
export default applicationSlice.reducer;
