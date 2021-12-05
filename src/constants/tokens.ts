import { Token } from '@uniswap/sdk-core';
import { OH_ADDRESS, USDC_ADDRESS } from './addresses';
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
