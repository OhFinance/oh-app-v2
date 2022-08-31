import { useState } from 'react';
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
  // note: placeholder history
  const [history, setHistory] = useState([
    'History 1',
    'History 2',
    'History 3',
    'History 4',
    'History 5',
  ]);

  let historyContent = [];
  if (history.length == 0) {
    historyContent.push(<>Your Transactions will appear here...</>);
  } else {
    historyContent = history.map((historyContent, index) => {
      return <HistoryContent key={index}>{historyContent}</HistoryContent>;
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
