import { Web3Provider } from '@ethersproject/providers';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import {
  getOhPerSec,
  getPoolInfo,
  getTotalAdjustedAllocPoint,
  Pool,
  useDialutingRepartition,
} from 'apis/MasterOh';
import { MASTER_OH_ADDRESS } from 'constants/addresses';
import { BigNumber, ethers } from 'ethers';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { getOhTokenPrice } from 'services/ohTokenPriceService';
import { isMobile } from '~/utilities/userAgent';
import ERC20ABI from '../abis/erc20.json';
import { gnosisSafe, injected } from '../connectors';
import { IS_IN_IFRAME, NetworkContextName } from '../constants/misc';

export function useActiveWeb3React() {
  const context = useWeb3React<Web3Provider>();
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  // gnosisSafe.isSafeApp() races a timeout against postMessage, so it delays pageload if we are not in a safe app;
  // if we are not embedded in an iframe, it is not worth checking
  const [triedSafe, setTriedSafe] = useState(!IS_IN_IFRAME);

  // first, try connecting to a gnosis safe
  useEffect(() => {
    if (!triedSafe && gnosisSafe !== null) {
      gnosisSafe.isSafeApp().then((loadedInSafe) => {
        if (loadedInSafe) {
          activate(gnosisSafe as SafeAppConnector, undefined, true).catch(() => {
            setTriedSafe(true);
          });
        } else {
          setTriedSafe(true);
        }
      });
    }
  }, [activate, setTriedSafe, triedSafe]);

  // then, if that fails, try connecting to an injected connector
  useEffect(() => {
    if (!active && triedSafe) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }
  }, [activate, active, triedSafe]);

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}

export const UseMedianBoostedAPR = async (
  poolId: number,
  chainId: number,
  provider: ethers.Provider
): Promise<BigNumber> => {
  const price = await getOhTokenPrice();
  const ohPerSec: BigNumber = await getOhPerSec(chainId, provider);
  const totalAdjustedAllocPoint = await getTotalAdjustedAllocPoint(chainId, provider);
  const dialutingRepartition = await useDialutingRepartition(chainId, provider);
  const poolInfo: Pool = (await getPoolInfo(chainId, provider))[poolId];

  const lpToken = new Token(chainId, poolInfo.lpToken, poolInfo.decimals, poolInfo.tokenSymbol);
  const token = new ethers.Contract(poolInfo.lpToken, ERC20ABI, provider);
  const totalStaked = await token.balanceOf(MASTER_OH_ADDRESS[chainId]);

  if (!poolInfo || totalStaked?.eq(BigNumber.from('0'))) {
    return BigNumber.from(0);
  }

  return poolInfo && ohPerSec && totalStaked
    ? ohPerSec
        .mul(parseEther('1'))
        .mul(poolInfo?.allocPoint)
        .div(totalAdjustedAllocPoint)
        .mul(BigNumber.from(1_000).sub(dialutingRepartition))
        .div(1_000)
        .div(2) // (0.5 * sumOfFactors) / sumOfFactors
        .div(totalStaked)
        .mul(60 * 60 * 24 * 360)
        .mul(parseEther(price.toString()))
        .div(parseUnits('1', 18 + (18 - lpToken?.decimals)))
        .mul(100)
    : BigNumber.from(0);
};
