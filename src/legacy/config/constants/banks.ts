import { Bank } from './types';
import aave from 'assets/img/aave.svg';
import comp from 'assets/img/comp.svg';
import crv from 'assets/img/crv.svg';
import benqi from 'assets/img/benqi.png';
import traderJoe from 'assets/img/trader-joe.png';
import ohUsdc from 'assets/img/oh-usdc.svg';
import ohUsdce from 'assets/img/oh-usdc-e.svg';
import tokens from './tokens';

const banks: { [chainId: number]: Bank[] } = {
  1: [
    {
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
  ],
  43114: [
    {
      image: ohUsdce,
      name: 'Oh! USDC.e',
      symbol: 'OH-USDC.e',
      decimals: 6,
      chainId: 43114,
      address: {
        43114: '0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB',
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
  ],
};

export default banks;
