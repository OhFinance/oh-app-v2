import { useStore } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div({});
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

const HistoryContent = styled.div({});

export default function BridgeHistory() {
  const store = useStore();

  const history = store.getState().bridge.history;
  let historyContent = [];
  if (history.length == 0) {
    historyContent.push(<>Your Transactions will appear here...</>);
  } else {
    historyContent = history.map((historyContent, index) => {
      return (
        <HistoryContent key={index}>
          {new Date(historyContent.transactionTime).toLocaleString()}
        </HistoryContent>
      );
    });
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
