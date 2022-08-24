import { Token } from '@uniswap/sdk-core';
import hum from 'assets/img/hum.svg';
import mfam from 'assets/img/mfam.png';
import aave from '~/assets/img/aave.svg';
import { Aave, Hummus, Moonwell, Yeti } from '~/assets/img/bank_headers';
import comp from '~/assets/img/comp.svg';
import crv from '~/assets/img/crv.svg';
import ohDaie from '~/assets/img/oh-dai-e.png';
import ohUsdce from '~/assets/img/oh-usdc-e.svg';
import ohUsdcMoonriver from '~/assets/img/oh-usdc-moonriver.png';
import ohUsdc from '~/assets/img/oh-usdc.svg';
import ohUsdte from '~/assets/img/oh-usdt-e.svg';
import ohUsdtMoonriver from '~/assets/img/oh-usdt-moonriver.png';
import ohUsdt from '~/assets/img/oh-usdt.svg';
import { SupportedChainId } from './chains';

export interface Bank {
  image: any;
  header: string;
  name: string;
  description: string;
  symbol: string;
  contractAddress: string;
  ohToken: Token;
  underlyingToken: Token;
  strategies: { protocol: string; image: string }[];
}

export const banks: { [chainId: number]: Bank[] } = {
  [SupportedChainId.ETHEREUM_MAINNET]: [
    {
      image: ohUsdc,
      header: Aave,
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
      strategies: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Compound', image: comp },
        { protocol: 'Curve', image: crv },
      ],
    },
  ],
  [SupportedChainId.AVALANCHE]: [
    {
      image: ohUsdce,
      header: Yeti,
      name: 'Oh! USDC',
      symbol: 'OH-USDC',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xe001DeCc1763F8BadBbc1b10c2D6db0900f9B928',
      ohToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xe001DeCc1763F8BadBbc1b10c2D6db0900f9B928',
        6,
        'OH-USDC',
        'Oh! USDC'
      ),
      underlyingToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        6,
        'USDC',
        'USDC'
      ),
      strategies: [
        { protocol: 'Yeti', image: aave },
        { protocol: 'Curve', image: crv },
      ],
    },
    {
      image: ohUsdte,
      header: Yeti,
      name: 'Oh! USDT',
      symbol: 'OH-USDT',
      description: 'Risk-Optimized Lending and Yield Farming',
      contractAddress: '0xB3ce618F43b53Cdc12077FB937f9fF465BcE1f60',
      ohToken: new Token(
        SupportedChainId.AVALANCHE,
        '0xB3ce618F43b53Cdc12077FB937f9fF465BcE1f60',
        6,
        'OH-USDT',
        'Oh! USDT'
      ),
      underlyingToken: new Token(
        SupportedChainId.AVALANCHE,
        '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
        6,
        'USDT',
        'USDT'
      ),
      strategies: [
        { protocol: 'Yeti', image: aave },
        { protocol: 'Curve', image: crv },
      ],
    },
    {
      image: ohUsdce,
      header: Aave,
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
      strategies: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Curve', image: crv },
      ],
    },
    {
      image: ohUsdte,
      header: Aave,
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
      strategies: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Curve', image: crv },
      ],
    },
    {
      image: ohDaie,
      header: Aave,
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
      strategies: [
        { protocol: 'Aave V2', image: aave },
        { protocol: 'Curve', image: crv },
      ],
    },
  ],
  [SupportedChainId.METIS]: [
    {
      image: ohUsdc,
      header: Hummus,
      name: 'Oh! m.USDC',
      symbol: 'OH-m.USDC',
      description: 'Optimized Compounding and Boosted Yield Farming',
      contractAddress: '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
      ohToken: new Token(
        SupportedChainId.METIS,
        '0x4C211F45876d8EC7bAb54CAc0e32AAD15095358A',
        6,
        'OH-m.USDC',
        'Oh! m.USDC'
      ),
      underlyingToken: new Token(
        SupportedChainId.METIS,
        '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
        6,
        'm.USDC',
        'm.USDC'
      ),
      strategies: [{ protocol: 'Hummus', image: hum }],
    },
    {
      image: ohUsdt,
      header: Hummus,
      name: 'Oh! m.USDT',
      symbol: 'OH-m.USDT',
      description: 'Optimized Compounding and Boosted Yield Farming',
      contractAddress: '0xc53bC2517Fceff56308b492AFad4A53d96d16ed8',
      ohToken: new Token(
        SupportedChainId.METIS,
        '0xc53bC2517Fceff56308b492AFad4A53d96d16ed8',
        6,
        'OH-m.USDT',
        'Oh! m.USDT'
      ),
      underlyingToken: new Token(
        SupportedChainId.METIS,
        '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
        6,
        'm.USDT',
        'm.USDT'
      ),
      strategies: [{ protocol: 'Hummus', image: hum }],
    },
  ],
  [SupportedChainId.MOONRIVER]: [
    {
      image: ohUsdcMoonriver,
      header: Moonwell,
      name: 'Oh! USDC',
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
      strategies: [{ protocol: 'Moonwell', image: mfam }],
    },
    {
      image: ohUsdtMoonriver,
      header: Moonwell,
      name: 'Oh! USDT',
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
      strategies: [{ protocol: 'Moonwell', image: mfam }],
    },
  ],
};
export const banksByContract: { [address: string]: Bank } = Object.values(banks).reduce(
  (prev, curr) => {
    curr.forEach((bank) => {
      prev[bank.contractAddress] = bank;
    });
    return prev;
  },
  {} as { [address: string]: Bank }
);

export const banksByChainContract: { [chainId: string]: { [address: string]: Bank } } =
  Object.values(banks).reduce((prev, curr) => {
    curr.forEach((bank) => {
      if (!prev[bank.ohToken.chainId]) {
        prev[bank.ohToken.chainId] = {};
      }
      prev[bank.ohToken.chainId][bank.contractAddress] = bank;
    });
    return prev;
  }, {});
