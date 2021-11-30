import aave from 'assets/img/aave.svg';
import benqi from 'assets/img/benqi.png';
import comp from 'assets/img/comp.svg';
import crv from 'assets/img/crv.svg';
import ohUsdce from 'assets/img/oh-usdc-e.svg';
import ohUsdc from 'assets/img/oh-usdc.svg';
import traderJoe from 'assets/img/trader-joe.png';
import tokens from './tokens';
import { Bank } from './types';

export const banks: { [chainId: number]: Bank } = {
  1: {
    image: ohUsdc,
    name: 'Oh! USDC',
    symbol: 'OH-USDC',
    decimals: 6,
    chainId: 1,
    address: {
      1: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
    },
    description: 'Risk-Optimized Lending and Yield Farming',
    alt: 'oh-usdc',
    underlying: tokens.usdc,
    strategies: [
      { protocol: 'Aave V2', image: aave },
      { protocol: 'Compound', image: comp },
      { protocol: 'Curve', image: crv },
    ],
  },
  42: {
    image: ohUsdc,
    name: 'Oh! USDC',
    symbol: 'OH-USDC',
    decimals: 6,
    chainId: 42,
    address: {
      42: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
    },
    description: 'Kovan Test Network: Risk-Optimized Lending and Yield Farming',
    alt: 'oh-usdc',
    underlying: tokens.usdc,
    strategies: [
      { protocol: 'Aave V2', image: aave },
      { protocol: 'Compound', image: comp },
      { protocol: 'Curve', image: crv },
    ],
  },
  43114: {
    image: ohUsdce,
    name: 'Oh! USDC.e',
    symbol: 'OH-USDC.e',
    decimals: 6,
    chainId: 43114,
    address: {
      43114: tokens.usdce.address?.[43114],
    },
    description: 'Avalanche C-Chain Optimized Lending and Yield Farming',
    alt: 'oh-usdc.e',
    underlying: tokens.usdce,
    strategies: [
      { protocol: 'Aave V2', image: aave },
      { protocol: 'Benqi', image: benqi },
      { protocol: 'Banker Joe', image: traderJoe },
      { protocol: 'Curve', image: crv },
    ],
  },
};
