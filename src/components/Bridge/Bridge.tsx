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
import { approveRouter, isRouterApproved, anySwapOutUnderlying } from '../../apis/multichain';
import { getERC20Balance } from '../../apis/erc20';

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
  backgroundColor: disabled ? 'grey' : '#E7018C',
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
const MaxButton = styled.button(({ theme, disabled }) => ({
  borderRadius: '10px',
  height: '70%',
  border: '2px solid grey',
  backgroundColor: theme.bg2,
  color: 'grey',
  '&:hover': {
    backgroundColor: 'white',
  },
  cursor: disabled ? 'default' : 'pointer',
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
  const [toNetwork, setToNetwork] = useState(SupportedChainId.AVALANCHE);
  const [bridgeTokenModalOpen, setBridgeTokenModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ [chainId: number]: Token }>();
  const [isApproved, setIsApproved] = useState(false);
  const [userBalance, setUserBalance] = useState(ethers.BigNumber.from('0'));
  const [amount, setAmount] = useState('0');
  const [bridgeAmount, setBridgeAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feePercentage, setFeePercentage] = useState(0);
  const [minFee, setMinFee] = useState('0');
  const [maxFee, setMaxFee] = useState('0');
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('0');
  const [routerAddress, setRouterAddress] = useState('');

  const { account, chainId, library } = useWeb3React();

  const fromNetwork = chainId || SupportedChainId.ETHEREUM_MAINNET;

  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedToken(null);
  }, [chainId, toNetwork]);

  const fetchInfo = async () => {
    if (!account || !selectedToken || !fromNetwork || !library || !routerAddress) {
      return;
    }
    setUserBalance(await getERC20Balance(account, selectedToken[fromNetwork].address, library));
    setIsApproved(
      await isRouterApproved(account, selectedToken[fromNetwork].address, routerAddress, library)
    );
  };

  useEffect(() => {
    fetchInfo();
  }, [account, selectedToken, fromNetwork, library, routerAddress]);

  const fetchBridgeParams = async () => {
    setRouterAddress('');
    setMin('0');
    setMax('0');
    setFeePercentage(0);
    setMinFee('0');
    setMaxFee('0');
    if (!selectedToken || !fromNetwork || !toNetwork || !chainId) {
      return;
    }
    const data = await fetch(`https://bridgeapi.anyswap.exchange/v4/tokenlistv4/${chainId}`);
    const tokenList = await data.json();
    const tokenInfo = tokenList[`evm${selectedToken[fromNetwork].address.toLowerCase()}`];
    if (!tokenInfo) {
      return;
    }

    const destChain = tokenInfo.destChains[toNetwork];
    if (!destChain) {
      return;
    }

    const destToken = destChain[Object.keys(destChain)[0]];
    const max = await getERC20Balance(
      destToken.anytoken.address,
      destToken.address,
      new ethers.providers.JsonRpcProvider(CHAIN_INFO[toNetwork].rpcUrls[0])
    );

    setRouterAddress(destToken.router);
    setMin(destToken.MinimumSwap.toString());
    setMax(ethers.utils.formatUnits(max, destToken.decimals));
    //setMax(destToken.MaximumSwap.toString());
    setFeePercentage(destToken.SwapFeeRatePerMillion.toString());
    setMinFee(destToken.MinimumSwapFee.toString());
    setMaxFee(destToken.MaximumSwapFee.toString());
  };

  useEffect(() => {
    fetchBridgeParams();
  }, [account, selectedToken, fromNetwork, toNetwork, chainId, library]);

  const submitApprove = async () => {
    setLoading(true);
    try {
      await approveRouter(selectedToken[fromNetwork].address, chainId, library);
      setIsApproved(true);
    } catch (e) {}
    setLoading(false);
  };

  const submitBridge = async () => {
    setLoading(true);
    try {
      const tx = await anySwapOutUnderlying(
        selectedToken[fromNetwork].address,
        account,
        ethers.utils.parseUnits(amount, selectedToken[fromNetwork].decimals),
        routerAddress,
        toNetwork,
        library
      );
      const historyItem: HistoryItem = {
        transactionHash: tx.hash,
        fromNetwork,
        toNetwork,
        fromNetworkToken: selectedToken[fromNetwork].address,
        toNetworkToken: selectedToken[toNetwork].address,
        transactionTime: Date.now(),
      };

      dispatch(addHistory(historyItem));
      save();

      await tx.wait();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const bridgePreflightCheck = () => {
    if (!routerAddress) {
      return false;
    }
    if (parseFloat(amount) > parseFloat(max) || parseFloat(amount) < parseFloat(min)) {
      return false;
    }
    if (loading) {
      return false;
    }
    if (!fromNetwork || !toNetwork || !selectedToken || !library || !amount) {
      return false;
    }
    if (fromNetwork !== chainId) {
      return false;
    }
    if (ethers.utils.parseUnits(amount, selectedToken[fromNetwork].decimals).gt(userBalance)) {
      return false;
    }
    if (!ethers.utils.parseUnits(amount, selectedToken[fromNetwork].decimals).gt('0')) {
      return false;
    }
    const _decimals = amount.split('.')[1];
    if (_decimals && _decimals.length > selectedToken[fromNetwork].decimals) {
      return false;
    }
    return true;
  };

  const handleAmount = (e) => {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  let feeAmount = parseFloat(feePercentage * parseFloat(amount));
  if (!amount) {
    feeAmount = 0;
  } else if (feeAmount > maxFee) {
    feeAmount = maxFee;
  } else if (feeAmount < minFee) {
    feeAmount = minFee;
  }

  const changeNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexlify(chainId) }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: CHAIN_INFO[chainId].name,
              chainId: ethers.utils.hexlify(chainId),
              nativeCurrency: CHAIN_INFO[chainId].name,
              rpcUrls: CHAIN_INFO[chainId].rpcUrls,
            },
          ],
        });
      } else {
        console.error(err);
      }
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
        chooseNetwork={changeNetwork}
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
          fromChainId={fromNetwork}
          toChainId={toNetwork}
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
          <BridgeAmount type="string" value={amount} onChange={handleAmount}></BridgeAmount>
          <MaxButton
            disabled={!Boolean(selectedToken && fromNetwork)}
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
      {routerAddress && isApproved ? (
        <SubmitButton disabled={!bridgePreflightCheck()} onClick={submitBridge}>
          {loading ? 'Loading...' : 'Submit'}
        </SubmitButton>
      ) : (
        <SubmitButton disabled={!bridgePreflightCheck()} onClick={submitApprove}>
          {loading ? 'Loading...' : 'Approve'}
        </SubmitButton>
      )}
      {/*TODO: replace*/}
      {selectedToken && (
        <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
          Min bridge amount: {min}
          <br />
          Max bridge amount: {max}
          <br />
          fee: {parseFloat(feeAmount).toFixed(2)} {selectedToken[fromNetwork].name}
        </div>
      )}
    </>
  );
}
