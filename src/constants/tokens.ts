import { Token } from '@uniswap/sdk-core';
import daiIcon from '../assets/img/tokens/dai-logo.png';
import ohIcon from '../assets/img/tokens/ohfinance_32.png';
import questionmarkImage from '../assets/img/tokens/questionmarkCircle.png';
import usdtIcon from '../assets/img/tokens/tether-usdt-logo.svg';
import usdcIcon from '../assets/img/tokens/usd-coin-usdc-logo.svg';
import { DAI_ADDRESS, OH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS } from './addresses';
import { SupportedChainId } from './chains';

export const OH: { [chainId: number]: Token } = {
  [SupportedChainId.ETHEREUM_MAINNET]: new Token(
    SupportedChainId.ETHEREUM_MAINNET,
    OH_ADDRESS[1],
    18,
    'OH',
    'Oh! Finance'
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    OH_ADDRESS[4],
    18,
    'OH',
    'Oh! Finance'
  ),
  [SupportedChainId.KOVAN]: new Token(
    SupportedChainId.KOVAN,
    OH_ADDRESS[42],
    18,
    'OH',
    'Oh! Finance'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    OH_ADDRESS[43114],
    18,
    'OH',
    'Oh! Finance'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    OH_ADDRESS[1285],
    18,
    'OH',
    'Oh! Finance'
  ),
  [SupportedChainId.METIS]: new Token(
    SupportedChainId.METIS,
    OH_ADDRESS[1088],
    18,
    'OH',
    'Oh! Finance'
  ),
};

export const USDC: { [chainId: number]: Token } = {
  [SupportedChainId.ETHEREUM_MAINNET]: new Token(
    SupportedChainId.ETHEREUM_MAINNET,
    USDC_ADDRESS[1],
    6,
    'USDC',
    'USD Coin'
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    USDC_ADDRESS[4],
    6,
    'USDC',
    'USD Coin'
  ),
  [SupportedChainId.KOVAN]: new Token(
    SupportedChainId.KOVAN,
    USDC_ADDRESS[42],
    6,
    'USDC',
    'USD Coin'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    USDC_ADDRESS[43114],
    6,
    'USDC',
    'USD Coin'
  ),
  [SupportedChainId.METIS]: new Token(
    SupportedChainId.METIS,
    USDC_ADDRESS[SupportedChainId.METIS],
    6,
    'USDC',
    'USD Coin'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    USDC_ADDRESS[SupportedChainId.MOONRIVER],
    6,
    'USDC',
    'USD Coin'
  ),
};

export const DAI: { [chainId: number]: Token } = {
  [SupportedChainId.ETHEREUM_MAINNET]: new Token(
    SupportedChainId.ETHEREUM_MAINNET,
    DAI_ADDRESS[1],
    18,
    'DAI',
    'Dai'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    DAI_ADDRESS[43114],
    18,
    'DAI',
    'Dai'
  ),
  [SupportedChainId.METIS]: new Token(
    SupportedChainId.METIS,
    DAI_ADDRESS[SupportedChainId.METIS],
    18,
    'DAI',
    'Dai'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    DAI_ADDRESS[SupportedChainId.MOONRIVER],
    18,
    'DAI',
    'Dai'
  ),
};

export const USDT: { [chainId: number]: Token } = {
  [SupportedChainId.ETHEREUM_MAINNET]: new Token(
    SupportedChainId.ETHEREUM_MAINNET,
    USDT_ADDRESS[SupportedChainId.ETHEREUM_MAINNET],
    6,
    'USDT',
    'Tether'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    USDT_ADDRESS[SupportedChainId.AVALANCHE],
    6,
    'USDT',
    'Tether'
  ),
  [SupportedChainId.METIS]: new Token(
    SupportedChainId.METIS,
    USDT_ADDRESS[SupportedChainId.METIS],
    6,
    'USDT',
    'Tether'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    USDT_ADDRESS[SupportedChainId.MOONRIVER],
    6,
    'USDT',
    'Tether'
  ),
};

// note: Some of these token icons are low quality. Find better ones
export const tokenLogos = {
  [USDC[1].symbol]: usdcIcon,
  [USDT[1].symbol]: usdtIcon,
  [DAI[1].symbol]: daiIcon,
  // note: get a higher quality photo
  [OH[1].symbol]: ohIcon,

  default: questionmarkImage,
};
