import { Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import Skeleton from 'components/Skeleton';
import BridgeTokenModal from 'components/_modals/bridgeModals/bridgeTokenModal';
import WarningModal from 'components/_modals/common/WarningModal';
import { CHAIN_INFO, L1ChainInfo, SupportedChainId } from 'constants/chains';
import { tokenLogos } from 'constants/tokens';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { useDispatch, useStore } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { save } from 'redux-localstorage-simple';
import {
  addHistory,
  BridgeState,
  setAmount as stateSetAmount,
  setRouterAddress,
  setSelectedToken,
  setToNetwork,
} from 'state/bridge/reducer';
import { HistoryItem } from 'state/bridge/types';
import styled from 'styled-components';
import { erc20Transfer, getERC20Balance, isBlackListed } from '../../apis/erc20';
import {
  anySwapOutUnderlying,
  approveRouter,
  isRouterApproved,
  swapout,
} from '../../apis/multichain';
import ToFromBox from '../../components/Bridge/ToFromBox';
import BridgeNetworkModal from '../../components/_modals/bridgeModals/bridgeNetworkModal';

const OH_PINK = '#E7018C';

const ToFromContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
  cursor: 'pointer',
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
  cursor: 'pointer',
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
  backgroundColor: disabled ? 'grey' : OH_PINK,
  marginTop: '20px',
  color: theme.bg4,
  border: disabled ? 'solid 2px grey' : 'solid 2px ' + OH_PINK,
  '&:-webkit-outer-spin-button': {
    opacity: '1',
  },
  '&:hover': {
    backgroundColor: disabled ? 'grey' : '#f056b3',
    borderColor: disabled ? 'grey' : '#f056b3',
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
  cursor: 'pointer',
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

const SpinnerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const TokenInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  width: '100%',
  marginTop: '10px',
});
const TokenInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const ContinueButton = styled.button({
  backgroundColor: OH_PINK,
  marginTop: '30px',
  border: 'none',
  borderRadius: '20px',
  color: 'white',
  padding: '10px 15px 10px 15px',
});

const BlacklistWarningText = styled.div({
  marginBottom: '50px',
});

export default function Bridge() {
  const state: BridgeState = useStore().getState().bridge;
  const dispatch = useDispatch();

  const [bridgeFromModalOpen, setBridgeFromModalOpen] = useState(false);
  const [bridgeToModalOpen, setBridgeToModalOpen] = useState(false);
  const [bridgeTokenModalOpen, setBridgeTokenModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [userBalance, setUserBalance] = useState(ethers.BigNumber.from('0'));
  const [amount, setAmount] = useState(state.amount);
  const [loading, setLoading] = useState(false);
  const [feePercentage, setFeePercentage] = useState(0);
  const [minFee, setMinFee] = useState('0');
  const [maxFee, setMaxFee] = useState('0');
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('0');
  const [type, setType] = useState('');
  const [liquidityWarningModalOpen, setLiquidityWarningModalOpen] = useState(false);
  const [blacklistWarningModalOpen, setBlacklistWarningModalOpen] = useState(false);
  const [amountWarningModalOpen, setAmountWarningModalOpen] = useState(false);
  const [amountWarningModalText, setAmountWarningModalText] = useState('');
  const [blackListed, setBlackListed] = useState(false);
  const [availableLiquidity, setAvailableLiquidity] = useState(Infinity);

  const { account, chainId, library } = useWeb3React();

  const fromNetwork = chainId || SupportedChainId.ETHEREUM_MAINNET;

  useEffect(() => {
    dispatch(setSelectedToken(null));
  }, [chainId]);

  const fetchInfo = async () => {
    if (
      !account ||
      !state.selectedToken ||
      !fromNetwork ||
      !state.selectedToken[fromNetwork] ||
      !library ||
      !state.routerAddress
    ) {
      return;
    }
    setUserBalance(
      await getERC20Balance(account, state.selectedToken[fromNetwork].address, library)
    );
    setIsApproved(
      await isRouterApproved(
        account,
        state.selectedToken[fromNetwork].address,
        state.routerAddress,
        library
      )
    );
  };

  useEffect(() => {
    fetchInfo();
  }, [account, state.selectedToken, fromNetwork, library, state.routerAddress]);

  const fetchBridgeParams = async () => {
    setLoading(true);
    dispatch(setRouterAddress);
    setMin('0');
    setMax('0');
    setFeePercentage(0);
    setMinFee('0');
    setMaxFee('0');
    setType('');
    setBlackListed(false);
    setAvailableLiquidity(Infinity);
    if (
      !state.selectedToken ||
      !fromNetwork ||
      !state.selectedToken[fromNetwork] ||
      !state.toNetwork ||
      !chainId
    ) {
      setLoading(false);
      return;
    }
    const data = await fetch(`https://bridgeapi.anyswap.exchange/v4/tokenlistv4/${chainId}`);
    const tokenList = await data.json();
    const tokenInfo = tokenList[`evm${state.selectedToken[fromNetwork].address.toLowerCase()}`];
    if (!tokenInfo) {
      setLoading(false);
      return;
    }
    const destChain = tokenInfo.destChains[state.toNetwork];
    if (!destChain) {
      setLoading(false);
      return;
    }

    const destToken = destChain[Object.keys(destChain)[0]];
    if (!destToken) {
      setLoading(false);
      return;
    }

    let _routerAddress;
    let _max = destToken.MaximumSwap.toString();
    if (destToken.type === 'swapout') {
      setType('swapout');
      _routerAddress = destToken.router;
    } else if (destToken.DepositAddress) {
      setType('transfer');
      _routerAddress = destToken.DepositAddress;
    } else {
      setType('anySwapOutUnderlying');
      _routerAddress = destToken.router;
    }
    //console.log(destToken);

    dispatch(setRouterAddress(_routerAddress));
    setBlackListed(await isBlackListed(state.selectedToken[fromNetwork], _routerAddress, library));

    if (destToken.anytoken && destToken.isLiquidity) {
      let _availableLiquidity = await getERC20Balance(
        destToken.anytoken.address,
        destToken.address,
        new ethers.providers.JsonRpcProvider(CHAIN_INFO[state.toNetwork].rpcUrls[0])
      );
      _availableLiquidity = _max;
      setAvailableLiquidity(_availableLiquidity);
    }

    setMin(destToken.MinimumSwap.toString());
    setMax(_max);
    setFeePercentage(destToken.SwapFeeRatePerMillion.toString());
    setMinFee(destToken.MinimumSwapFee.toString());
    setMaxFee(destToken.MaximumSwapFee.toString());
    setLoading(false);
    fetchInfo();
  };

  useEffect(() => {
    fetchBridgeParams();
  }, [account, state.selectedToken, fromNetwork, state.toNetwork, chainId, library]);

  const submitApprove = async () => {
    if (blackListed) {
      setBlacklistWarningModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      await approveRouter(state.selectedToken[fromNetwork].address, state.routerAddress, library);
      setIsApproved(true);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const submitBridgeHelper = async () => {
    if (blackListed) {
      setBlacklistWarningModalOpen(true);
    } else if (parseFloat(amount) > parseFloat(availableLiquidity)) {
      setLiquidityWarningModalOpen(true);
    } else if (
      !state.selectedToken[fromNetwork] ||
      ethers.utils.parseUnits(amount, state.selectedToken[fromNetwork].decimals).gt(userBalance)
    ) {
      setAmountWarningModalText('Amount is greater than your balance.');
      setAmountWarningModalOpen(true);
    } else if (parseFloat(amount) > parseFloat(max)) {
      setAmountWarningModalText('Amount is greater than the maximum.');
      setAmountWarningModalOpen(true);
    } else if (parseFloat(amount) < parseFloat(min)) {
      setAmountWarningModalText('Amount is lower than the minimum.');
      setAmountWarningModalOpen(true);
    } else {
      submitBridge();
    }
  };

  const submitBridge = async () => {
    setLiquidityWarningModalOpen(false);
    setLoading(true);
    let autoSuccess = false;
    let tx;
    try {
      if (type === 'anySwapOutUnderlying') {
        tx = await anySwapOutUnderlying(
          state.selectedToken[fromNetwork].address,
          account,
          ethers.utils.parseUnits(amount, state.selectedToken[fromNetwork].decimals),
          state.routerAddress,
          chainId,
          state.toNetwork,
          library
        );
      } else if (type === 'swapout') {
        tx = await swapout(
          account,
          ethers.utils.parseUnits(amount, state.selectedToken[fromNetwork].decimals),
          state.routerAddress,
          library
        );
      } else {
        tx = await erc20Transfer(
          state.selectedToken[fromNetwork].address,
          state.routerAddress,
          ethers.utils.parseUnits(amount, state.selectedToken[fromNetwork].decimals),
          library
        );
        autoSuccess = true;
      }

      const historyItem: HistoryItem = {
        transactionHash: tx.hash,
        fromNetwork,
        toNetwork: state.toNetwork,
        fromNetworkToken: state.selectedToken[fromNetwork].address,
        toNetworkToken: state.selectedToken[state.toNetwork].address,
        transactionTime: Date.now(),
        autoSuccess,
      };

      await tx.wait();

      dispatch(addHistory(historyItem));
      save();
      fetchInfo();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const bridgePreflightCheck = () => {
    if (!state.routerAddress) {
      return false;
    }
    if (loading) {
      return false;
    }
    if (!fromNetwork || !state.toNetwork || !state.selectedToken || !library || !amount) {
      return false;
    }
    if (fromNetwork !== chainId) {
      return false;
    }
    if (!ethers.utils.parseUnits(amount, state.selectedToken[fromNetwork].decimals).gt('0')) {
      return false;
    }
    const _decimals = amount.split('.')[1];
    if (_decimals && _decimals.length > state.selectedToken[fromNetwork].decimals) {
      return false;
    }
    if (!type) {
      return false;
    }
    return true;
  };

  const approveDisabledCheck = () => {
    if (!state.routerAddress || !type) {
      return false;
    }
    // approval is loading loading
    if (loading) {
      return false;
    }
    // if fromNetwork, toNetwork, selectedToken, or token amount is not set, or metamask is not selected
    if (!fromNetwork || !state.toNetwork || !state.selectedToken || !library) {
      return false;
    }
    // if the fromNetwork isn't a valid network
    if (fromNetwork !== chainId) {
      return false;
    }
    return true;
  };

  const handleAmount = (e) => {
    if (!isNaN(e.target.value)) {
      dispatch(stateSetAmount(e.target.value));
      setAmount(e.target.value);
    }
  };

  let feeAmount = feePercentage * parseFloat(amount);
  if (!amount) {
    feeAmount = 0;
  } else if (feeAmount > parseFloat(maxFee)) {
    feeAmount = parseFloat(maxFee);
  } else if (feeAmount < parseFloat(minFee)) {
    feeAmount = parseFloat(minFee);
  }

  const changeNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexStripZeros(ethers.utils.hexlify(chainId)) }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: CHAIN_INFO[chainId].name,
              chainId: ethers.utils.hexStripZeros(ethers.utils.hexlify(chainId)),
              nativeCurrency: CHAIN_INFO[chainId].nativeCurrency,
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
  const toNetworkData: L1ChainInfo = CHAIN_INFO[state.toNetwork || SupportedChainId.AVALANCHE];

  return (
    <>
      <WarningModal
        title="Warning"
        isOpen={liquidityWarningModalOpen}
        setModalOpen={setLiquidityWarningModalOpen}
      >
        There is not enough liquidity for the token you want to swap so you will get Wrapped tokens
        <ContinueButton onClick={submitBridge}>Continue anyway</ContinueButton>
      </WarningModal>
      <WarningModal
        title="Blacklisted Router"
        isOpen={blacklistWarningModalOpen}
        setModalOpen={setBlacklistWarningModalOpen}
      >
        <BlacklistWarningText>
          This router has been blacklisted and the transaction cannot be completed at this time
        </BlacklistWarningText>
      </WarningModal>
      <WarningModal
        title="Invalid Amount"
        isOpen={amountWarningModalOpen}
        setModalOpen={setAmountWarningModalOpen}
      >
        <BlacklistWarningText>{amountWarningModalText}</BlacklistWarningText>
      </WarningModal>
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
        chooseNetwork={(networkId: number) => {
          dispatch(setToNetwork(networkId));
          dispatch(setSelectedToken(null));
        }}
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
      {/* {state.selectedToken && fromNetwork && (
          <p>
            {ethers.utils.formatUnits(userBalance, state.selectedToken[fromNetwork].decimals).toString()}
          </p>
        )} */}
      <BalanceText>
        {' '}
        Balance:{' '}
        {state.selectedToken && fromNetwork && state.selectedToken[fromNetwork]
          ? ethers.utils
              .formatUnits(userBalance, state.selectedToken[fromNetwork].decimals)
              .toString()
          : 0.0}
      </BalanceText>
      <BridgeTokenContainer>
        <BridgeTokenModal
          title={'Token'}
          isOpen={bridgeTokenModalOpen}
          fromChain={fromNetworkData.label}
          fromChainId={fromNetwork}
          toChainId={state.toNetwork}
          setModalOpen={setBridgeTokenModalOpen}
          chooseToken={(token: { [chainId: number]: Token }) => {
            dispatch(setSelectedToken(token));
          }}
        />
        <BridgeToken
          onClick={() => {
            setBridgeTokenModalOpen(true);
          }}
        >
          <img
            src={
              tokenLogos &&
              state.selectedToken &&
              fromNetwork &&
              state.selectedToken[fromNetwork]?.symbol
                ? tokenLogos[state.selectedToken[fromNetwork]?.symbol]
                  ? tokenLogos[state.selectedToken[fromNetwork]?.symbol]
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
          {state.selectedToken == undefined ? (
            <BridgeTokenButton>Select a token</BridgeTokenButton>
          ) : (
            <SelectedTokenText>
              {state.selectedToken[fromNetwork]?.symbol
                ? state.selectedToken[fromNetwork]?.symbol
                : 'N/A'}
              <AiFillCaretDown />
            </SelectedTokenText>
          )}
        </BridgeTokenText>

        <BridgeAmountContainer>
          <BridgeAmount type="string" value={amount} onChange={handleAmount}></BridgeAmount>
          <MaxButton
            disabled={!Boolean(state.selectedToken && fromNetwork)}
            onClick={() =>
              setAmount(
                ethers.utils
                  .formatUnits(userBalance, state.selectedToken[fromNetwork].decimals)
                  .toString()
              )
            }
          >
            Max
          </MaxButton>
        </BridgeAmountContainer>
      </BridgeTokenContainer>
      {state.routerAddress && (isApproved || type === 'transfer') ? (
        loading ? (
          <SpinnerContainer>
            <ClipLoader color={OH_PINK} />
          </SpinnerContainer>
        ) : (
          <SubmitButton disabled={!bridgePreflightCheck()} onClick={submitBridgeHelper}>
            {'Submit'}
          </SubmitButton>
        )
      ) : loading ? (
        <SpinnerContainer>
          <ClipLoader color={OH_PINK} />
        </SpinnerContainer>
      ) : (
        <SubmitButton disabled={!approveDisabledCheck()} onClick={submitApprove}>
          {'Approve'}
        </SubmitButton>
      )}
      {/*TODO: replace*/}
      {state.selectedToken && fromNetwork && state.selectedToken[fromNetwork] && (
        <TokenInfoContainer style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
          <TokenInfo>Min bridge amount: {loading ? <Skeleton width={'20%'} /> : min}</TokenInfo>
          <TokenInfo>Max bridge amount: {loading ? <Skeleton width={'20%'} /> : max}</TokenInfo>
          <TokenInfo>
            fee:{' '}
            {loading ? (
              <Skeleton width={'10%'} />
            ) : (
              `${feeAmount.toFixed(2)} ${state.selectedToken[fromNetwork].symbol}`
            )}
          </TokenInfo>
        </TokenInfoContainer>
      )}
    </>
  );
}
