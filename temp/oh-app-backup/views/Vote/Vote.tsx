import { Box } from "@material-ui/core";
import { ViewHeader } from "components/ViewHeader";
import { ViewWrapper } from "components/ViewWrapper";
import { VoteMetrics } from "./components/VoteMetrics";
import { VoteTabs } from "./components/VoteTabs";

const Vote = () => {
  return (
    <ViewWrapper>
      <ViewHeader
        title="Vote"
        subtitle="Participate in Decentralized Governance and control the Protocol"
      />
      <Box mb={2}>
        <VoteMetrics />
      </Box>
      <VoteTabs />
    </ViewWrapper>
  );
};

export default Vote;
