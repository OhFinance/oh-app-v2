import { Token } from './types';

const tokens: { [token: string]: Token } = {
  dai: {
    symbol: 'DAI',
    decimals: 6,
    address: {
      1: '',
      4: '',
    },
  },
  ohToken: {
    symbol: 'OH',
    decimals: 18,
    address: {
      1: '',
      4: '',
    },
  },
  ohUsdc: {
    symbol: 'OH-USDC',
    decimals: 6,
    address: {
      1: '',
      4: '',
    },
  },
  usdc: {
    symbol: 'USDC',
    decimals: 6,
    address: {
      1: '',
      4: '',
    },
  },
  usdt: {
    symbol: 'USDT',
    decimals: 6,
    address: {
      1: '',
      4: '',
    },
  },
};

export default tokens;
