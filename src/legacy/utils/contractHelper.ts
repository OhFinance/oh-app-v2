import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export function getContract(
  library: Web3Provider,
  abi?: any,
  address?: string,
  account?: string | null
) {
  if (!abi || !address) {
    return null;
  }
  // const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, getProviderOrSigner(library, account ?? undefined));
}

export const getProviderOrSigner = (library: Web3Provider, account?: string) => {
  return account ? library.getSigner(account).connectUnchecked() : library;
};
