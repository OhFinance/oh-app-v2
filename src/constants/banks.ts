import { Token } from '@uniswap/sdk-core';
import aave from '~/assets/img/aave.svg';
import benqi from '~/assets/img/benqi.png';
import comp from '~/assets/img/comp.svg';
import crv from '~/assets/img/crv.svg';
import ohUsdc from '~/assets/img/oh-usdc.svg';
import traderJoe from '~/assets/img/trader-joe.png';
import { OH_USDC_BANK } from './addresses';
import { SupportedChainId } from './chains';
import { USDC } from './tokens';

export interface Bank {
  image: string;
  name: string;
  description: string;
  symbol: string;
  contractAddressMap: Record<number, string>;
  ohTokenMap: Record<number, Token>;
  underlyingTokenMap: Record<number, Token>;
  strategies: Record<number, { protocol: string; image: string }[]>;
}

export const banks: Bank[] = [
  {
    image: ohUsdc,
    name: 'Oh! USDC',
    symbol: 'OH-USDC',
    description: 'Risk-Optimized Lending and Yield Farming',
    contractAddressMap: OH_USDC_BANK,
    ohTokenMap: Object.entries(USDC).reduce<{ [chainId: number]: Token }>((prev, curr) => {
      const [key, token] = curr as unknown as [SupportedChainId, Token];
      const bankAddress = OH_USDC_BANK[key];
      prev[key] = new Token(
        token.chainId,
        bankAddress,
        token.decimals,
        `OH-${token.symbol}`,
        `Oh! ${token.symbol}`
      );
      return prev;
    }, {}),
    underlyingTokenMap: USDC,
    strategies: {
      [SupportedChainId.ETHEREUM_MAINNET]: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Compound', image: comp },
        { protocol: 'Curve', image: crv },
      ],
      [SupportedChainId.KOVAN]: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Compound', image: comp },
        { protocol: 'Curve', image: crv },
      ],
      [SupportedChainId.RINKEBY]: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Compound', image: comp },
        { protocol: 'Curve', image: crv },
      ],
      [SupportedChainId.AVALANCHE]: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Benqi', image: benqi },
        { protocol: 'Banker Joe', image: traderJoe },
        { protocol: 'Curve', image: crv },
      ],
    },
  },
];
