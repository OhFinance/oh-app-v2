import { flatten } from 'lodash';
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
    const allBanks = flatten(Object.values(banks));

    for (let i = 0; i < allBanks.length; i++) {
      const bank = allBanks[i];
      try {
        const info = await fetchBankInfo(Number(bank.ohToken.chainId), bank.contractAddress);
        if (info) {
          bankAPYs.push({
            chainId: Number(bank.ohToken.chainId),
            address: bank.contractAddress,
            apys: info.apys,
          });
        }
      } catch (err) {
        console.debug('No bank data could be fetched ', {
          chainId: bank.ohToken.chainId,
          contract: bank.contractAddress,
        });
      }
    }
    setBankAPYData(bankAPYs);
    setLoading(false);
  }, [banks, fetchBankInfo, setBankAPYData, setLoading]);

  useEffect(() => {
    if (loading && retries < MAXIMUM_RETRIES) {
      fetchAllBankInfo();
    }
  }, [loading, retries, fetchAllBankInfo, setBankAPYData]);

  return null;
}
