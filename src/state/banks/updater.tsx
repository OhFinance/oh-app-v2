import { useCallback, useEffect, useState } from 'react';
import { banks } from '~/constants/banks';
import { SetBankAPY } from './actions';
import { useBankAPYManager, useFetchBankInfoCallback } from './hooks';

const MAXIMUM_RETRIES = 5;
export default function Updater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [setBankAPYData] = useBankAPYManager();

  const fetchBankInfo = useFetchBankInfoCallback();

  const fetchAllBankInfo = useCallback(async () => {
    let bankAPYs: SetBankAPY[] = [];
    for (let i = 0; i < banks.length; i++) {
      const bank = banks[i];
      const entries = Object.entries(bank.contractAddressMap);
      for (let i = 0; i < entries.length; i++) {
        const [chainId, contract] = entries[i];
        try {
          const info = await fetchBankInfo(Number(chainId), contract);
          if (info) {
            bankAPYs.push({
              chainId: Number(chainId),
              address: contract,
              apys: info.apys,
            });
          }
        } catch (err) {
          console.debug('No bank data could be fetched ', { chainId, contract });
        }
      }
    }

    setBankAPYData(bankAPYs);
    setLoading(false);
  }, [banks, fetchBankInfo, setBankAPYData, setLoading]);

  useEffect(() => {
    if (loading && retries < MAXIMUM_RETRIES) {
      console.log('fetching');
      fetchAllBankInfo();
    }
  }, [loading, retries, fetchAllBankInfo, setBankAPYData]);

  return null;
}
