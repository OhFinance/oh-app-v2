import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { CHAIN_INFO } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ExternalLink, ThemedText } from 'theme';
import { ModalView } from '../modalViews';
import depositAnimation from './animations/deposit.gif';
import loader from './animations/loader.svg';
import pig_success from './animations/pig-success.svg';
import pig_withdraw from './animations/pig-withdraw-check.svg';
import pig from './animations/pig.svg';
import withdrawSuccess from './animations/withdraw-success.gif';
import withdrawingAnimation from './animations/withdrawing.gif';

const Wrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.bg2,
  boxShadow: 'inset 0px 0px 50px #001F71',
  padding: '16px 0px 26px',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}));

const IconContainer = styled.div(({ theme }) => ({
  maxHeight: 150,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: 150,
  width: 150,
}));

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }

`;

const Loader = styled.img`
  width: 150px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  animation: ${css`
    ${rotate} 2s ease-in-out infinite;
  `};
`;

const Icon = styled.img({
  maxHeight: '150px',
  zIndex: 2,
  position: 'relative',
});

const BlockExplorer = styled(ExternalLink)({
  fontSize: '12px',
  fontWeight: 400,
  textDecoration: 'none',
  color: '#fff',
  cursor: 'pointer',
  marginTop: 4,
});

interface ModalIconProps {
  view: ModalView;
}

interface DepositProps extends ModalIconProps {
  view: ModalView.DEPOSIT | ModalView.DEPOSITING;
  amount: CurrencyAmount<Token>;
}

interface DepositCompleteProps extends ModalIconProps {
  view: ModalView.DEPOSIT_COMPLETE;
  hash: string;
}

interface WithdrawProps extends ModalIconProps {
  view: ModalView.WITHDRAW | ModalView.WITHDRAWING;
  amount: CurrencyAmount<Token>;
}

interface WithdrawCompleteProps extends ModalIconProps {
  view: ModalView.WITHDRAW_COMPLETE;
  hash: string;
}

type ViewProps = DepositProps | DepositCompleteProps | WithdrawProps | WithdrawCompleteProps;

export default function ModalIcon(info: ViewProps) {
  const { chainId } = useActiveWeb3React();
  let chain = chainId ? CHAIN_INFO[chainId] : undefined;
  function getExplorerUrl(hash: string) {
    if (chain) {
      let prefix = chain.explorer;
      if (prefix.charAt(prefix.length - 1) === '/') {
        prefix = prefix.substring(0, prefix.length - 1);
      }
      return prefix + '/tx/' + hash;
    } else {
      return 'https://etherscan.io/tx/' + hash;
    }
  }
  function getContent() {
    switch (info.view) {
      case ModalView.DEPOSIT:
        return (
          <>
            <IconContainer>
              <Icon src={depositAnimation as any} alt="Depositing animation" />
            </IconContainer>
            <ThemedText.H1 fontWeight={500}>{info.amount.toFixed(3)}</ThemedText.H1>
            <ThemedText.Main>{info.amount.currency.symbol} Bank Tokens</ThemedText.Main>
          </>
        );
      case ModalView.DEPOSITING:
        return (
          <>
            <IconContainer>
              <Loader src={loader} alt="loader" />
              <Icon src={pig} alt="pig" width={'45px'} />
            </IconContainer>
            <ThemedText.H1 fontWeight={500}>{info.amount.toFixed(3)}</ThemedText.H1>
            <ThemedText.Main>{info.amount.currency.symbol} Bank Tokens</ThemedText.Main>
            <ThemedText.Main fontWeight={400} fontSize="12px" marginTop="4px">
              Confirm this transaction in your wallet
            </ThemedText.Main>
          </>
        );
      case ModalView.DEPOSIT_COMPLETE:
        return (
          <>
            <IconContainer>
              <Icon src={pig_success} alt="pig success" />
            </IconContainer>
            <ThemedText.Main fontWeight={400}>Transaction Submitted</ThemedText.Main>
            <BlockExplorer href={getExplorerUrl(info.hash)}>
              View on Block Explorer{' '}
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.98315 4.5976C6.16894 4.77963 6.31653 4.9969 6.41729 5.23669C6.51805 5.47648 6.56995 5.73396 6.56995 5.99406C6.56995 6.25416 6.51805 6.51165 6.41729 6.75143C6.31653 6.99122 6.16894 7.2085 5.98315 7.39053L4.38559 8.96016C4.20356 9.14594 3.98629 9.29354 3.7465 9.3943C3.50671 9.49506 3.24923 9.54696 2.98913 9.54696C2.72903 9.54696 2.47154 9.49506 2.23175 9.3943C1.99196 9.29354 1.77469 9.14594 1.59266 8.96016C1.40688 8.77813 1.25928 8.56085 1.15852 8.32106C1.05776 8.08127 1.00586 7.82379 1.00586 7.56369C1.00586 7.30359 1.05776 7.04611 1.15852 6.80632C1.25928 6.56653 1.40688 6.34926 1.59266 6.16722L2.07305 5.68684"
                  stroke="#009CE2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.65418 5.94936C4.4684 5.76733 4.3208 5.55006 4.22004 5.31027C4.11928 5.07048 4.06738 4.81299 4.06738 4.5529C4.06738 4.2928 4.11928 4.03531 4.22004 3.79552C4.3208 3.55573 4.4684 3.33846 4.65418 3.15643L6.22381 1.5868C6.40584 1.40102 6.62312 1.25342 6.86291 1.15266C7.1027 1.0519 7.36018 1 7.62028 1C7.88038 1 8.13786 1.0519 8.37765 1.15266C8.61744 1.25342 8.83471 1.40102 9.01674 1.5868C9.20253 1.76883 9.35012 1.98611 9.45089 2.22589C9.55165 2.46568 9.60355 2.72317 9.60355 2.98327C9.60355 3.24337 9.55165 3.50085 9.45089 3.74064C9.35012 3.98043 9.20253 4.1977 9.01674 4.37973L8.53636 4.86012"
                  stroke="#009CE2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BlockExplorer>
          </>
        );
      case ModalView.WITHDRAW:
        return (
          <>
            <IconContainer>
              <Icon src={pig_withdraw} alt="Withdraw" />
            </IconContainer>
            <ThemedText.H1 fontWeight={500}>{info.amount.toFixed(3)}</ThemedText.H1>
            <ThemedText.Main>{info.amount.currency.symbol} Bank Tokens</ThemedText.Main>
          </>
        );
      case ModalView.WITHDRAWING:
        return (
          <>
            <IconContainer>
              <Icon src={withdrawingAnimation as any} alt="Withdrawing" />
            </IconContainer>
            <ThemedText.H1 fontWeight={500}>{info.amount.toFixed(3)}</ThemedText.H1>
            <ThemedText.Main>{info.amount.currency.symbol} Bank Tokens</ThemedText.Main>
            <ThemedText.Main fontWeight={400} fontSize="12px" marginTop="4px">
              Confirm this transaction in your wallet
            </ThemedText.Main>
          </>
        );
      case ModalView.WITHDRAW_COMPLETE:
        return (
          <>
            <IconContainer>
              <Icon src={withdrawSuccess as any} alt="pig success" />
            </IconContainer>
            <ThemedText.Main fontWeight={400}>Transaction Submitted</ThemedText.Main>
            <BlockExplorer href={getExplorerUrl(info.hash)}>
              View on Block Explorer{' '}
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.98315 4.5976C6.16894 4.77963 6.31653 4.9969 6.41729 5.23669C6.51805 5.47648 6.56995 5.73396 6.56995 5.99406C6.56995 6.25416 6.51805 6.51165 6.41729 6.75143C6.31653 6.99122 6.16894 7.2085 5.98315 7.39053L4.38559 8.96016C4.20356 9.14594 3.98629 9.29354 3.7465 9.3943C3.50671 9.49506 3.24923 9.54696 2.98913 9.54696C2.72903 9.54696 2.47154 9.49506 2.23175 9.3943C1.99196 9.29354 1.77469 9.14594 1.59266 8.96016C1.40688 8.77813 1.25928 8.56085 1.15852 8.32106C1.05776 8.08127 1.00586 7.82379 1.00586 7.56369C1.00586 7.30359 1.05776 7.04611 1.15852 6.80632C1.25928 6.56653 1.40688 6.34926 1.59266 6.16722L2.07305 5.68684"
                  stroke="#009CE2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.65418 5.94936C4.4684 5.76733 4.3208 5.55006 4.22004 5.31027C4.11928 5.07048 4.06738 4.81299 4.06738 4.5529C4.06738 4.2928 4.11928 4.03531 4.22004 3.79552C4.3208 3.55573 4.4684 3.33846 4.65418 3.15643L6.22381 1.5868C6.40584 1.40102 6.62312 1.25342 6.86291 1.15266C7.1027 1.0519 7.36018 1 7.62028 1C7.88038 1 8.13786 1.0519 8.37765 1.15266C8.61744 1.25342 8.83471 1.40102 9.01674 1.5868C9.20253 1.76883 9.35012 1.98611 9.45089 2.22589C9.55165 2.46568 9.60355 2.72317 9.60355 2.98327C9.60355 3.24337 9.55165 3.50085 9.45089 3.74064C9.35012 3.98043 9.20253 4.1977 9.01674 4.37973L8.53636 4.86012"
                  stroke="#009CE2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BlockExplorer>
          </>
        );
    }
  }
  return <Wrapper>{getContent()}</Wrapper>;
}
