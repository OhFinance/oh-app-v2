import { Token } from '@uniswap/sdk-core';
import BridgeTokenModal from 'components/_modals/bridgeModals/bridgeTokenModal';
import { CHAIN_INFO, L1ChainInfo, SupportedChainId } from 'constants/chains';
import { tokenLogos } from 'constants/tokens';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';

import { useDispatch, useStore } from 'react-redux';
import { save } from 'redux-localstorage-simple';
import styled from 'styled-components';
import ToFromBox from '../../components/Bridge/ToFromBox';
import BridgeNetworkModal from '../../components/_modals/bridgeModals/bridgeNetworkModal';

import { useWeb3React } from '@web3-react/core';
import { addHistory } from 'state/bridge/reducer';
import { HistoryItem } from 'state/bridge/types';
import { approveRouter, isRouterApproved } from '../../apis/multichain';

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
  width: '100%',
  height: '100px',
  borderRadius: '20px',
  marginTop: '5px',
  padding: '10px',
}));

const BridgeToken = styled.div({
  height: '70%',
  aspectRatio: '1/1',
});
const BridgeTokenText = styled.div({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100px',
  fontSize: '12px',
  textAlign: 'center',
  color: 'grey',
});

const BridgeTokenButton = styled.div({
  border: '2px solid grey',
  padding: '5px',
  margin: '5px',
  borderRadius: '20px',
  textAlign: 'center',
  fontSize: '12px',
  color: 'grey',
  '&:hover': {
    backgroundColor: 'white',
  },
});

const SubmitButton = styled.button(({ theme, disabled }) => ({
  borderRadius: '20px',
  height: '50px',
  width: '100%',
  backgroundColor: '#E7018C',
  marginTop: '20px',
  color: theme.bg4,
  border: 'solid 2px #E7018C',
  '&:-webkit-outer-spin-button': {
    opacity: '1',
  },
  cursor: disabled ? 'default' : 'pointer',
}));

const IconContainer = styled.p({
  fontSize: '30px',
});

const BridgeAmount = styled.input(({ theme }) => ({
  borderRadius: '10px',
  border: 'none',
  height: '100%',
  width: '80%',
  backgroundColor: theme.bg4,
  fontSize: '30px',
  outline: 'none',
  color: 'grey',
  '&::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
  },
  '&::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
}));

const BridgeAmountContainer = styled.div({
  width: '70%',
  height: '70%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#001553',
  borderRadius: '10px',
});
const MaxButton = styled.button(({ theme }) => ({
  borderRadius: '10px',
  height: '70%',
  border: '2px solid grey',
  backgroundColor: theme.bg2,
  color: 'grey',
  '&:hover': {
    backgroundColor: 'white',
  },
}));
const SelectedTokenText = styled.p({
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  justifyContent: 'center',
  color: '#e0e0e0',
  margin: '0',
});

const BalanceText = styled.p({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '95%',
  margin: 0,
  color: 'grey',
  fontSize: '12px',
});

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
      Bridge Tokens to a different network
      <ToFromContainer>
        <ToFromBox
          icon={fromNetworkData.logoUrl}
          networkName={fromNetworkData.label}
          openModal={setBridgeFromModalOpen}
        >
          From
        </ToFromBox>
        <IconContainer>
          <BsArrowRightShort />
        </IconContainer>

        <ToFromBox
          icon={toNetworkData.logoUrl}
          networkName={toNetworkData.label}
          openModal={setBridgeToModalOpen}
        >
          To
        </ToFromBox>
      </ToFromContainer>
      {/* {selectedToken && fromNetwork && (
          <p>
            {ethers.utils.formatUnits(userBalance, selectedToken[fromNetwork].decimals).toString()}
          </p>
        )} */}
      <BalanceText>
        {' '}
        Balance:{' '}
        {selectedToken && fromNetwork
          ? ethers.utils.formatUnits(userBalance, selectedToken[fromNetwork].decimals).toString()
          : 0.0}
      </BalanceText>
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
          Token to Bridge
          {selectedToken == undefined ? (
            <BridgeTokenButton>Select a token</BridgeTokenButton>
          ) : (
            <SelectedTokenText>
              {selectedToken[fromNetwork]?.symbol ? selectedToken[fromNetwork]?.symbol : 'N/A'}
              <AiFillCaretDown />
            </SelectedTokenText>
          )}
        </BridgeTokenText>

        <BridgeAmountContainer>
          <BridgeAmount type="number" value={amount} onChange={handleAmount}></BridgeAmount>
          <MaxButton
            disabled={Boolean(selectedToken && fromNetwork)}
            onClick={() =>
              setAmount(
                ethers.utils
                  .formatUnits(userBalance, selectedToken[fromNetwork].decimals)
                  .toString()
              )
            }
          >
            Max
            {/* Max:{' '}
              {ethers.utils
                .formatUnits(userBalance, selectedToken[fromNetwork].decimals)
                .toString()} */}
          </MaxButton>
          {/* )} */}
        </BridgeAmountContainer>
      </BridgeTokenContainer>
      {isApproved ? (
        <SubmitButton disabled={!bridgePreflightCheck()}>Submit</SubmitButton>
      ) : (
        <SubmitButton onClick={submitApprove}>Approve</SubmitButton>
      )}
    </>
  );
}
