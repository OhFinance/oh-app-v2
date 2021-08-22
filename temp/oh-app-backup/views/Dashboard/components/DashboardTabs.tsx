import { Box, Divider, Tab, Tabs } from "@material-ui/core";
import { Surface } from "components/Surface";
import { useState } from "react";
import { DashboardBalances } from "./DashboardBalances";
import { DashboardStaked } from "./DashboardStaked";

export const DashboardTabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <Surface p={0}>
      <Tabs value={index} onChange={(_: any, value: number) => setIndex(value)}>
        <Tab label="Balances" />
        <Tab label="Staked" />
      </Tabs>
      <Divider />
      {index === 0 && <DashboardBalances />}
      {index === 1 && <DashboardStaked />}

      <Box m={2} />
    </Surface>
  );
};
