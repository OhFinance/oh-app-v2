import { Box, Divider, Tab, Tabs } from "@material-ui/core";
import { Surface } from "components/Surface";
import { useState } from "react";
import { VoteDelegate } from "./VoteDelegate";
import { VotePropose } from "./VotePropose";
import { VoteView } from "./VoteView";

export const VoteTabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <Surface p={0}>
      <Tabs value={index} onChange={(_: any, value: number) => setIndex(value)}>
        <Tab label="View" />
        <Tab label="Delegation" />
        <Tab label="Propose" />
      </Tabs>
      <Divider />
      

      <Box m={2}>
        {index === 0 && <VoteView />}
        {index === 1 && <VoteDelegate />}
        {index === 2 && <VotePropose />}
      </Box>
    </Surface>
  );
};
