import { Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core';
import ohUsdcIcon from '../assets/img/oh-usdc.svg';
import ohUsdtIcon from '../assets/img/oh-usdt.svg';
import daiIcon from '../assets/img/tokens/dai-logo.png';
import ohIcon from '../assets/img/tokens/ohfinance_32.png';
import questionmarkImage from '../assets/img/tokens/questionmarkCircle.png';
import usdtIcon from '../assets/img/tokens/tether-usdt-logo.svg';
import usdcIcon from '../assets/img/tokens/usd-coin-usdc-logo.svg';
import {
  DAI_ADDRESS,
  OH_ADDRESS,
  OH_USDC_ADDRESS,
  OH_USDT_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
  VEOH_ADDRESS,
} from './addresses';
import { SupportedChainId } from './chains';

export const USDC_MAINNET = new Token(
  SupportedChainId.ETHEREUM_MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

export const USDC_RINKEBY = new Token(
  SupportedChainId.RINKEBY,
  '0xCEe95f9Aa3248eC712c001483439A10B180faC9e',
  6,
  'USDC',
  'USDC'
);

export const VeOH: { [chainId: number]: Token } = {
  [SupportedChainId.ETHEREUM_MAINNET]: new Token(
    SupportedChainId.ETHEREUM_MAINNET,
    VEOH_ADDRESS[SupportedChainId.ETHEREUM_MAINNET],
    18,
    'veOH',
    'veOH! Finance'
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    VEOH_ADDRESS[SupportedChainId.RINKEBY],
    18,
    'veOH',
    'veOH! Finance'
  ),
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    VEOH_ADDRESS[SupportedChainId.GOERLI],
    18,
    'veOH',
    'veOH! Finance'
  ),
  [SupportedChainId.METIS]: new Token(
    SupportedChainId.METIS,
    VEOH_ADDRESS[SupportedChainId.METIS],
    18,
    'veOH',
    'veOH! Finance'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    VEOH_ADDRESS[SupportedChainId.MOONRIVER],
    18,
    'veOH',
    'veOH! Finance'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    VEOH_ADDRESS[SupportedChainId.AVALANCHE],
    18,
    'veOH',
    'veOH! Finance'
  ),
};

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
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    OH_ADDRESS[SupportedChainId.GOERLI],
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
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    USDC_ADDRESS[SupportedChainId.GOERLI],
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
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    DAI_ADDRESS[SupportedChainId.GOERLI],
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

export const OH_USDT: { [chainId: number]: Token } = {
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    OH_USDT_ADDRESS[SupportedChainId.RINKEBY],
    6,
    'OH-USDT',
    'Oh! USDT'
  ),
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    OH_USDT_ADDRESS[SupportedChainId.GOERLI],
    6,
    'OH-USDT',
    'Oh! USDT'
  ),
};

export const OH_USDC: { [chainId: number]: Token } = {
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    OH_USDC_ADDRESS[SupportedChainId.GOERLI],
    6,
    'OH-USDC',
    'Oh! USDC'
  ),
};

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
};

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (wrapped) return wrapped;
    throw new Error('Unsupported chain ID');
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};
export function nativeOnChain(chainId: number): NativeCurrency {
  return cachedNativeCurrency[chainId] || ExtendedEther.onChain(chainId);
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } =
  {
    USDC: {
      [SupportedChainId.ETHEREUM_MAINNET]: USDC_MAINNET.address,
    },
  };

export const VeOH_TOKENS = [{ pid: 0, token: USDC_RINKEBY, name: 'USDC' }];

// note: Some of these token icons are low quality. Find better ones
export const tokenLogos = {
  [USDC[1].symbol]: usdcIcon,
  [USDT[1].symbol]: usdtIcon,
  [DAI[1].symbol]: daiIcon,
  // note: get a higher quality photo
  [OH[1].symbol]: ohIcon,
  [OH_USDT[SupportedChainId.GOERLI].symbol]: ohUsdtIcon,
  [OH_USDC[SupportedChainId.GOERLI].symbol]: ohUsdcIcon,

  default: questionmarkImage,
};

export const getTokenIcon = (currentNetwork: number, tokenAddress: string) => {
  let tokenSymbol;

  switch (tokenAddress) {
    case USDC_RINKEBY.address:
      if (currentNetwork == SupportedChainId.RINKEBY) {
        tokenSymbol = USDC_RINKEBY.symbol;
        break;
      }
    case OH[currentNetwork]?.address:
      tokenSymbol = OH[currentNetwork].symbol;
      break;
    case VeOH[currentNetwork]?.address:
      tokenSymbol = VeOH[currentNetwork].symbol;
      break;
    case USDC[currentNetwork]?.address:
      tokenSymbol = USDC[currentNetwork].symbol;
      break;
    case DAI[currentNetwork]?.address:
      tokenSymbol = DAI[currentNetwork].symbol;
      break;
    case USDT[currentNetwork]?.address:
      tokenSymbol = USDT[currentNetwork].symbol;
      break;
    case OH_USDT[currentNetwork]?.address:
      tokenSymbol = OH_USDT[currentNetwork].symbol;
      break;
    case OH_USDC[currentNetwork]?.address:
      tokenSymbol = OH_USDC[currentNetwork].symbol;
      break;
    default:
      tokenSymbol = 'default';
      break;
  }

  return tokenLogos[tokenSymbol];
};
