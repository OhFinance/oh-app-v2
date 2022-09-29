import { useStore } from 'react-redux';
import styled from 'styled-components';
import BridgeHistoryEntry from './BridgeHistoryEntry';

const HistoryTitleContainer = styled.div({});
const HistoryTitle = styled.p({
  color: 'grey',
});

const HistoryContainer = styled.div({
  width: '90%',
  backgroundColor: '#8a8a8a',
  padding: '15px',
  borderRadius: '20px',
});

export default function BridgeHistory() {
  const store = useStore();

  const history = store.getState().bridge.history;
  let historyContent = [];
  if (history.length == 0) {
    historyContent.push(<>Your Transactions will appear here...</>);
  } else {
    for (let i = history.length - 1; i >= 0; i--) {
      historyContent.push(
        <>
          <BridgeHistoryEntry key={i} transaction={history[i]} />
          <br />
        </>
      );
    }
  }

  return (
    <>
      <HistoryTitleContainer>
        <HistoryTitle>View the history of all your bridge interactions</HistoryTitle>
      </HistoryTitleContainer>
      <HistoryContainer>{historyContent}</HistoryContainer>
    </>
  );
}
