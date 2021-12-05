import BANK_ABI from '~/abis/oh_bank.json';
import { OhBank } from '~/abis/types';
import { useContract } from './useContract';

export function useBankContract(bankAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<OhBank>(bankAddress, BANK_ABI, withSignerIfPossible);
}
