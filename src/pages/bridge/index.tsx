import BridgeHistory from 'components/Bridge/BridgeHistory';
import { useState } from 'react';
import styled from 'styled-components';
import Bridge from '../../components/Bridge/Bridge';

const PageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: '800px',
  minHeight: '500px',
});

const BridgeBox = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.bg4,
  flexDirection: 'column',
  alignItems: 'center',
  width: '700px',
  padding: '30px',
  borderRadius: '20px',
  margin: '20px',
}));

const TaskSelector = styled.div({
  width: '250px',
  height: '40px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#262626',
  borderRadius: '20px',
  margin: '10px',
  justifyContent: 'space-around',
  alignItems: 'center',
});

interface TaskProp {
  selected: boolean;
}

const Task = styled.div<TaskProp>`
  background-color: ${(props) => (props.selected ? '#063d9c' : '#262626')};
  color: ${(props) => (props.selected ? 'white' : '#5c5c5c')};
  border-radius: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => (props.selected ? '#5c5c5c' : '#f5f5f5')};
    cursor: pointer;
  }
`;

const BRIDGE = 'BRIDGE';
const HISTORY = 'HISTORY';
export default function BridgePage() {
  const [selectedTask, setSelectedTask] = useState(BRIDGE);

  let pageContent;
  switch (selectedTask) {
    case HISTORY:
      pageContent = <BridgeHistory />;
      break;
    // by default show bridge content
    default:
      pageContent = <Bridge />;
  }

  return (
    <PageContainer>
      <BridgeBox>
        <TaskSelector>
          <Task
            selected={selectedTask == BRIDGE}
            onClick={() => {
              setSelectedTask(BRIDGE);
            }}
          >
            Bridge
          </Task>
          <Task
            selected={selectedTask == HISTORY}
            onClick={() => {
              setSelectedTask(HISTORY);
            }}
          >
            History
          </Task>
        </TaskSelector>
        {pageContent}
      </BridgeBox>
    </PageContainer>
  );
}
