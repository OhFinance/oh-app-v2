import axios from 'axios';
import { banks } from 'config/constants/banks';
import { useEffect, useState } from 'react';
import { ALL_SUPPORTED_CHAIN_IDS } from '~/constants/chains';
import { SetBankAPY } from './actions';
import { useBankAPYManager } from './hooks';

const MAXIMUM_RETRIES = 5;
export default function Updater() {
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [setBankAPYData] = useBankAPYManager();

  useEffect(() => {
    const fetchAPY = async () => {
      try {
        const allBanks = ALL_SUPPORTED_CHAIN_IDS.map((chainId) => banks[chainId]).flat();
        const values = await Promise.all(
          allBanks.map((bank) =>
            axios.get(
              `https://api.oh.finance/apy?chain=${bank.chainId}&addr=${
                (bank.address as any)[bank.chainId]
              }`
            )
          )
        );

        let bankAPYs: SetBankAPY[] = [];
        values.forEach((value, i) => {
          const bank = allBanks[i];
          bankAPYs.push({
            chainId: bank.chainId,
            address: (bank.address as any)[bank.chainId],
            apys: value.data.apys,
          });
        });
        setBankAPYData(bankAPYs);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setRetries(retries + 1);
      }
    };

    if (loading && retries < MAXIMUM_RETRIES) {
      fetchAPY();
    }
  }, [loading, retries, setBankAPYData]);

  return null;
}
