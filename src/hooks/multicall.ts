// import { SkipFirst } from 'types/tuple';
// import useBlockNumber from '~/hooks/useBlockNumber';
// import { useActiveWeb3React } from '~/hooks/web3';
// import * as hooks from '~/state/multicall/hooks';
// export { NEVER_RELOAD } from '@uniswap/redux-multicall'; // re-export for convenience
// export type { CallStateResult } from '@uniswap/redux-multicall'; // re-export for convenience

// // Create wrappers for hooks so consumers don't need to get latest block themselves

// type SkipFirstTwoParams<T extends (...args: any) => any> = SkipFirst<Parameters<T>, 2>;

// export function useMultipleContractSingleData(
//   ...args: SkipFirstTwoParams<typeof hooks.useMultipleContractSingleData>
// ) {
//   const { chainId, latestBlock } = useCallContext();
//   return hooks.useMultipleContractSingleData(chainId, latestBlock, ...args);
// }

// export function useSingleCallResult(...args: SkipFirstTwoParams<typeof useSingleCallResult>) {
//   const { chainId, latestBlock } = useCallContext();
//   return useSingleCallResult(chainId, latestBlock, ...args);
// }

// export function useSingleContractMultipleData(
//   ...args: SkipFirstTwoParams<typeof useSingleContractMultipleData>
// ) {
//   const { chainId, latestBlock } = useCallContext();
//   return useSingleContractMultipleData(chainId, latestBlock, ...args);
// }

// export function useSingleContractWithCallData(
//   ...args: SkipFirstTwoParams<typeof useSingleContractWithCallData>
// ) {
//   const { chainId, latestBlock } = useCallContext();
//   return useSingleContractWithCallData(chainId, latestBlock, ...args);
// }

// function useCallContext() {
//   const { chainId } = useActiveWeb3React();
//   const latestBlock = useBlockNumber();
//   return { chainId, latestBlock };
// }
