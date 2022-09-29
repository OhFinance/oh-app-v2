import { CHAIN_INFO } from 'constants/chains';
import { DAI, OH, USDC, USDT } from 'constants/tokens';
import { useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import styled from 'styled-components';

const TxLink = styled.a({
  wordWrap: 'break-word',
  textDecoration: 'none',
  color: 'pink',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    color: '#ffd1fc',
  },
});

export default function BridgeHistoryEntry({ transaction }) {
  const [status, setStatus] = useState('');

  const fetchStatus = async () => {
    if (transaction.autoSuccess) {
      return;
    }
    try {
      const response = await fetch(
        `https://bridgeapi.anyswap.exchange/v2/history/details?params=${transaction.transactionHash}`
      );
      const statusData = await response.json();
      if (statusData.msg === 'Success') {
        const _status = statusData.info.status;
        switch (_status) {
          case 10:
            setStatus('Success');
            return;
          case 3:
            setStatus('Bridge amount too low');
            return;
          case 8:
            setStatus('Confirming');
            break;
          case 9:
            setStatus('Swapping');
            break;
          case 12:
            setStatus('Large swap amount, wait 24 hours');
            break;
          case 14:
            setStatus('Failed');
            return;
        }
      }
      setStatus('Pending');
      setTimeout(fetchStatus, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  let fromToken;
  switch (transaction.fromNetworkToken) {
    case USDC[transaction.fromNetwork].address:
      fromToken = USDC[transaction.fromNetwork].symbol;
      break;
    case OH[transaction.fromNetwork].address:
      fromToken = OH[transaction.fromNetwork].symbol;
      break;
    case DAI[transaction.fromNetwork].address:
      fromToken = OH[transaction.fromNetwork].symbol;
      break;
    case USDT[transaction.fromNetwork].address:
      fromToken = OH[transaction.fromNetwork].symbol;
      break;
    default:
      fromToken = 'N/A';
  }

  return (
    <div>
      Time: {new Date(transaction.transactionTime).toLocaleString()}
      <br />
      Bridging {fromToken} token from {CHAIN_INFO[transaction.fromNetwork].name} chain to{' '}
      {CHAIN_INFO[transaction.toNetwork].name} chain
      <br />
      Status: {transaction.autoSuccess ? 'Success' : status}
      <br />
      <TxLink
        href={`${CHAIN_INFO[transaction.fromNetwork].explorer}/tx/${transaction.transactionHash}`}
      >
        <BsLink45Deg /> View Transaction
      </TxLink>
    </div>
  );
}
