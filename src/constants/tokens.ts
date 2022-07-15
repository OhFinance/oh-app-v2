import { Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core';
import { OH_ADDRESS, USDC_ADDRESS, VEOH_ADDRESS } from './addresses';
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
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    VEOH_ADDRESS[SupportedChainId.RINKEBY],
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
    'USDC.e',
    'USD Coin'
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
