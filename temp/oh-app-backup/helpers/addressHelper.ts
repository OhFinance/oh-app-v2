import { Address } from "config/constants/types"
import contracts from 'config/constants/contracts'
import tokens from 'config/constants/tokens'

export const getAddress = (address: Address): string => {
  const chainId = process.env.CHAIN_ID
  return address[chainId || 1]
}

// contract addresses

export const getForumAddress = (): string => {
  return getAddress(contracts.forum)
}

export const getGovernorAddress = (): string => {
  return getAddress(contracts.governor)
}

export const getLiquidatorAddress = (): string => {
  return getAddress(contracts.liquidator)
}

export const getManagerAddress = (): string => {
  return getAddress(contracts.manager)
}

export const getVestingAddress = (): string => {
  return getAddress(contracts.vesting)
}

// token addresses

export const getOhUsdcAddress = (): string => {
  return getAddress(tokens.ohUsdc.address);
}

export const getTokenAddress = (): string => {
  return getAddress(tokens.ohToken.address)
}

export const getUsdcAddress = (): string => {
  return getAddress(tokens.usdc.address)
}
