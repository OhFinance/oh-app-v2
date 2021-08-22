import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Flex } from "@ohfinance/oh-ui";

export const VoteDelegate = () => {
  return (
    <Box>
      <p>
        Delegation allows you to participate in Governance or delegate your
        votes to another trusted user.
      </p>
      <Flex center>
        <Grid container spacing={1}>
          <Grid item>
            <TextField variant="outlined" placeholder="Delegate" size="small" />
          </Grid>
          <Grid item>
            <Button variant="contained" size="medium" color="primary">
              Delegate
            </Button>
          </Grid>
        </Grid>
        <Flex center>
          <p>My Current Delegation</p>
          <p>0x0000000000000000000000000000000000000000</p>
        </Flex>
      </Flex>
    </Box>
  );
};
