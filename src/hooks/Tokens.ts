import { Currency, Token } from '@uniswap/sdk-core';
import { arrayify, parseBytes32String } from 'ethers/lib/utils';
import { flatten } from 'lodash';
import { useMemo } from 'react';
import { banks } from '~/constants/banks';
import { NEVER_RELOAD } from '~/state/multicall/constants';
import { useSingleCallResult } from '~/state/multicall/hooks';
import { isAddress } from '~/utilities';
import { useBytes32TokenContract, useTokenContract } from './contracts/useTokenContract';
import { useActiveWeb3React } from './web3';

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = flatten(Object.values(banks)).reduce<{ [address: string]: Token }>(
    (prev, curr) => {
      prev[curr.underlyingToken.address] = curr.underlyingToken;
      prev[curr.ohToken.address] = curr.ohToken;

      return prev;
    },
    {}
  );

  return allTokens;
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

function parseStringOrBytes32(
  str: string | undefined,
  bytes32: string | undefined,
  defaultValue: string
): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue;
}

// undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token
export function useToken(tokenAddress?: string | null): Token | undefined | null {
  const { chainId } = useActiveWeb3React();
  const tokens = useAllTokens();

  const address = isAddress(tokenAddress);

  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
  const token: Token | undefined = address ? tokens[address] : undefined;

  const tokenName = useSingleCallResult(tokenContract, 'name', undefined, NEVER_RELOAD);
  const tokenNameBytes32 = useSingleCallResult(
    tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  );
  const symbol = useSingleCallResult(tokenContract, 'symbol', undefined, NEVER_RELOAD);
  const symbolBytes32 = useSingleCallResult(
    tokenContractBytes32,
    'symbol',
    undefined,
    NEVER_RELOAD
  );
  const decimals = useSingleCallResult(tokenContract, 'decimals', undefined, NEVER_RELOAD);

  return useMemo(() => {
    if (token) return token;
    if (tokenAddress === null) return null;
    if (!chainId || !address) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      );
    }
    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenAddress,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ]);
}

export function useCurrency(currencyId: string | null | undefined): Currency | null | undefined {
  const token = useToken(currencyId);
  if (currencyId === null || currencyId === undefined) return undefined;
  return token;
}
