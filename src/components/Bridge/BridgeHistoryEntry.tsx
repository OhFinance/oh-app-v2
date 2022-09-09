import { useState, useEffect } from 'react';

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

  return (
    <div>
      Time: {new Date(transaction.transactionTime).toLocaleString()}
      <br />
      Status: {transaction.autoSuccess ? 'Success' : status}
    </div>
  );
}
