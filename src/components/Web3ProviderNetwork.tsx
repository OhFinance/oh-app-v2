import { createWeb3ReactRoot } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '~/constants/misc';

const Web3ReactRoot = createWeb3ReactRoot(NetworkContextName);

function Web3ProviderNetwork({
  children,
  getLibrary,
}: {
  children: JSX.Element;
  getLibrary: (
    provider?: any,
    connector?: Required<Web3ReactContextInterface>['connector']
  ) => void;
}) {
  return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>;
}

export default Web3ProviderNetwork;
