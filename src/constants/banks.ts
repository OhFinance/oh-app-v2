import { Token } from '@uniswap/sdk-core';
import aave from '~/assets/img/aave.svg';
import benqi from '~/assets/img/benqi.png';
import comp from '~/assets/img/comp.svg';
import crv from '~/assets/img/crv.svg';
import ohDaie from '~/assets/img/oh-dai-e.png';
import ohUsdce from '~/assets/img/oh-usdc-e.svg';
import ohUsdcMoonriver from '~/assets/img/oh-usdc-moonriver.png';
import ohUsdc from '~/assets/img/oh-usdc.svg';
import ohUsdte from '~/assets/img/oh-usdt-e.svg';
import ohUsdtMoonriver from '~/assets/img/oh-usdt-moonriver.png';
import traderJoe from '~/assets/img/trader-joe.png';
import { SupportedChainId } from './chains';

export interface Bank {
  image: string;
  name: string;
  description: string;
  symbol: string;
  contractAddress: string;
  ohToken: Token;
  underlyingToken: Token;
  strategies: Record<number, { protocol: string; image: string }[]>;
}

export const banks: { [chainId: number]: Bank[] } = {
  [SupportedChainId.ETHEREUM_MAINNET]: [
    {
      image: ohUsdc,
      name: 'Oh! USDC',
      symbol: 'OH-USDC',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
      ohToken: new Token(
        SupportedChainId.ETHEREUM_MAINNET,
        '0xa528639AAe2E765351dcd1e0C2dD299D6279dB52',
        6,
        'OH-USDC',
        'Oh! USDC'
      ),
      underlyingToken: new Token(
        SupportedChainId.ETHEREUM_MAINNET,
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        6,
        'USDC',
        'USDC'
      ),
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
  ],
  [SupportedChainId.AVALANCHE]: [
    {
      image: ohUsdce,
      name: 'Oh! USDC.e',
      symbol: 'OH-USDC.e',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB',
      ohToken: new Token(
        SupportedChainId.AVALANCHE,
        '0x8B1Be96dc17875ee01cC1984e389507Bb227CaAB',
        6,
        'OH-USDC.e',
        'Oh! USDC.e'
      ),
      underlyingToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
        6,
        'USDC.e',
        'USDC.e'
      ),
      strategies: {},
    },
    {
      image: ohUsdte,
      name: 'Oh! USDT.e',
      symbol: 'OH-USDT.e',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xd96AbEcf6AA022735CFa9CB512d63645b0834720',
      ohToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xd96AbEcf6AA022735CFa9CB512d63645b0834720',
        6,
        'OH-USDT.e',
        'Oh! USDT.e'
      ),
      underlyingToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xc7198437980c041c805a1edcba50c1ce5db95118',
        6,
        'USDT.e',
        'USDT.e'
      ),
      strategies: {},
    },
    {
      image: ohDaie,
      name: 'Oh! DAI.e',
      symbol: 'OH-DAI.e',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xF74303DD14E511CCD90219594e8069d36Da01DCD',
      ohToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xF74303DD14E511CCD90219594e8069d36Da01DCD',
        18,
        'OH-DAI.e',
        'Oh! DAI.e'
      ),
      underlyingToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
        18,
        'DAI.e',
        'DAI.e'
      ),
      strategies: {},
    },
  ],
  [SupportedChainId.MOONRIVER]: [
    {
      image: ohUsdcMoonriver,
      name: 'Oh! Moonwell USDC',
      symbol: 'OH-USDC',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
      ohToken: new Token(
        SupportedChainId.MOONRIVER,
        '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
        6,
        'OH-USDC',
        'Oh! USDC'
      ),
      underlyingToken: new Token(
        SupportedChainId.MOONRIVER,
        '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
        6,
        'USDC',
        'USDC'
      ),
      strategies: {},
    },
    {
      image: ohUsdtMoonriver,
      name: 'Oh! Moonwell USDT',
      symbol: 'OH-USDT',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xdeA7Ff1D84B7E54587b434C1A585718857CF61d1',
      ohToken: new Token(
        SupportedChainId.MOONRIVER,
        '0xdeA7Ff1D84B7E54587b434C1A585718857CF61d1',
        6,
        'OH-USDT',
        'Oh! USDT'
      ),
      underlyingToken: new Token(
        SupportedChainId.MOONRIVER,
        '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        6,
        'USDT',
        'USDT'
      ),
      strategies: {},
    },
  ],
};