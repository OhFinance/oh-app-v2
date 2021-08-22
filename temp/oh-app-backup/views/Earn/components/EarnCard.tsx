import { Surface } from "components/Surface";
import OhLogo from "assets/img/oh-logo.png";
import { Flex } from "@ohfinance/oh-ui";
import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
import { Bank } from "config/constants/types";
import { EarnCompositionGroup } from "./EarnCompositionGroup";

export interface EarnCardProps {
  bank: Bank;
}

export const EarnCard: FC<EarnCardProps> = ({ bank, ...props }) => {
  return (
    <Surface {...props}>
      <Flex center mb={2}>
        <Avatar src={bank.image} />
      </Flex>
      <Typography variant="h6" align="center">
        {bank.symbol}
      </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        {bank.description}
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        <b>18% APY</b>
      </Typography>
      <Flex align="center" justify="space-between" mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <Avatar src={bank.underlying} />
              <Typography align="center" variant="body2">
                Underlying
              </Typography>
            </Flex>
          </Grid>
          <Grid item xs={12} md={6}>
            <Flex center column>
              <EarnCompositionGroup composition={bank.composition} />
              <Typography align="center" variant="body2">
                Composition
              </Typography>
            </Flex>
          </Grid>
        </Grid>
      </Flex>
      <Button variant="contained" color="primary" fullWidth>
        Deposit / Withdraw
      </Button>
    </Surface>
  );
};
