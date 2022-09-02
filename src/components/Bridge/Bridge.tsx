import { Token } from '@uniswap/sdk-core';
import BridgeTokenModal from 'components/_modals/bridgeModals/bridgeTokenModal';
import { CHAIN_INFO, L1ChainInfo, SupportedChainId } from 'constants/chains';
import { tokenLogos } from 'constants/tokens';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { save } from 'redux-localstorage-simple';
import styled from 'styled-components';
import ToFromBox from '../../components/Bridge/ToFromBox';
import BridgeNetworkModal from '../../components/_modals/bridgeModals/bridgeNetworkModal';

import { useWeb3React } from '@web3-react/core';
import { addHistory } from 'state/bridge/reducer';
import { HistoryItem } from 'state/bridge/types';
import { isRouterApproved } from '../../apis/multichain';

const PageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: '800px',
  minHeight: '500px',
});

const ToFromContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const BridgeTokenContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: theme.bg2,
  flexDirection: 'row',
  alignItems: 'center',
  width: '90%',
  height: '100px',
  borderRadius: '20px',
  marginTop: '20px',
}));

const BridgeToken = styled.div({
  height: '80%',
  aspectRatio: '1/1',
});
const BridgeTokenText = styled.div({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100px',
  fontSize: '12px',
  textAlign: 'center',
});

const BridgeTokenButton = styled.div({
  border: '2px solid grey',
  padding: '5px',
  margin: '5px',
  borderRadius: '20px',
  textAlign: 'center',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'grey',
  },
});

const BridgeAmount = styled.input(({ theme }) => ({
  borderRadius: '20px',
  height: '50%',
  backgroundColor: theme.bg4,
  color: 'white',
  '&:-webkit-outer-spin-button': {
    opacity: '1',
  },
}));

const SubmitButton = styled.button(({ theme, disabled }) => ({
  borderRadius: '20px',
  height: '50%',
  backgroundColor: theme.bg4,
  color: 'white',
  '&:-webkit-outer-spin-button': {
    opacity: '1',
  },
  cursor: disabled ? 'default' : 'pointer',
}));

export default function Bridge() {
  const [bridgeFromModalOpen, setBridgeFromModalOpen] = useState(false);
  const [bridgeToModalOpen, setBridgeToModalOpen] = useState(false);
  const [fromNetwork, setFromNetwork] = useState(SupportedChainId.ETHEREUM_MAINNET);
  const [toNetwork, setToNetwork] = useState(SupportedChainId.AVALANCHE);
  const [bridgeTokenModalOpen, setBridgeTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ [chainId: number]: Token }>();
  const [isApproved, setIsApproved] = useState(false);
  const [userBalance, setUserBalance] = useState(ethers.BigNumber.from('0'));
  const [amount, setAmount] = useState('0');
  const [bridgeAmount, setBridgeAmount] = useState(0);

  const { account, chainId, library } = useWeb3React();

  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fromNetwork && fromNetwork !== chainId) {
      //prompt user to switch networks
    }
  }, [fromNetwork]);

  const fetchInfo = async () => {
    if (!account || !selectedToken || !fromNetwork) {
      return;
    }
    setIsApproved(
      await isRouterApproved(account, selectedToken[fromNetwork].address, chainId, library)
    );
  };

  useEffect(() => {
    fetchInfo();
  }, [account, selectedToken, fromNetwork, chainId, library]);

  const submitApprove = async () => {
    await approveRouter(account, selectedToken[fromNetwork].address, chainId, library);
    setIsApproved(true);
  };

  const bridgePreflightCheck = () => {
    if (!fromNetwork || !toNetwork || !selectedToken || !library) {
      return false;
    }
    if (fromNetwork !== chainId) {
      return false;
    }
    if (ethers.utils.parseEther(amount).gt(userBalance)) {
      return false;
    }

    const historyItem: HistoryItem = {
      // transactionHash: 'test',
      // fromNetwork: fromNetwork,
      // toNetwork: toNetwork,
      // fromNetworkToken: selectedToken[fromNetwork].address,
      // toNetworkToken: 'TEMP',
      // transactionTime: Date.nw(),

      // note: temp values, replace with above
      transactionHash: 'tx hash',
      fromNetwork: 999,
      toNetwork: 888,
      fromNetworkToken: 'from network token',
      toNetworkToken: 'to network token',
      transactionTime: Date.now(),
    };

    dispatch(addHistory(historyItem));
    save();
    return true;
  };

  const handleAmount = (e) => {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const fromNetworkData: L1ChainInfo = CHAIN_INFO[fromNetwork];
  const toNetworkData: L1ChainInfo = CHAIN_INFO[toNetwork];

  return (
    <>
      <BridgeNetworkModal
        title="From Networks"
        isOpen={bridgeFromModalOpen}
        setModalOpen={setBridgeFromModalOpen}
        chooseNetwork={setFromNetwork}
      />
      <BridgeNetworkModal
        title="To Networks"
        isOpen={bridgeToModalOpen}
        setModalOpen={setBridgeToModalOpen}
        chooseNetwork={setToNetwork}
      />
      Bridge Page
      <ToFromContainer>
        <ToFromBox
          icon={fromNetworkData.logoUrl}
          networkName={fromNetworkData.label}
          openModal={setBridgeFromModalOpen}
        >
          From
        </ToFromBox>
        <ToFromBox
          icon={toNetworkData.logoUrl}
          networkName={toNetworkData.label}
          openModal={setBridgeToModalOpen}
        >
          To
        </ToFromBox>
      </ToFromContainer>
      <BridgeTokenContainer>
        <BridgeTokenModal
          title={'Token'}
          isOpen={bridgeTokenModalOpen}
          fromChain={fromNetworkData.label}
          setModalOpen={setBridgeTokenModalOpen}
          chooseToken={setSelectedToken}
        />
        <BridgeToken
          onClick={() => {
            setBridgeTokenModalOpen(true);
          }}
        >
          <img
            src={
              tokenLogos && selectedToken && fromNetwork && selectedToken[fromNetwork]?.symbol
                ? tokenLogos[selectedToken[fromNetwork]?.symbol]
                  ? tokenLogos[selectedToken[fromNetwork]?.symbol]
                  : tokenLogos.default
                : tokenLogos.default
            }
            alt="tokenIcon"
            width="100%"
            height="100%"
          />
        </BridgeToken>
        <BridgeTokenText
          onClick={() => {
            setBridgeTokenModalOpen(true);
          }}
        >
          <p>Token to Bridge</p>
          {selectedToken == undefined ? (
            <BridgeTokenButton>Select a token</BridgeTokenButton>
          ) : (
            <BridgeTokenButton>
              {selectedToken[fromNetwork]?.symbol ? selectedToken[fromNetwork]?.symbol : 'N/A'}
            </BridgeTokenButton>
          )}
        </BridgeTokenText>
        {selectedToken && fromNetwork && (
          <button
            onClick={() =>
              setAmount(
                ethers.utils
                  .formatUnits(userBalance, selectedToken[fromNetwork].decimals)
                  .toString()
              )
            }
          >
            Max:{' '}
            {ethers.utils.formatUnits(userBalance, selectedToken[fromNetwork].decimals).toString()}
          </button>
        )}
        <BridgeAmount type="number" value={amount} onChange={handleAmount} />
        {isApproved ? (
          <SubmitButton disabled={!bridgePreflightCheck()}>Submit</SubmitButton>
        ) : (
          <SubmitButton onClick={submitApprove}>Approve</SubmitButton>
        )}
      </BridgeTokenContainer>
    </>
  );
}
