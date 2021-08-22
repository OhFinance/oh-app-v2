import { Grid } from "@material-ui/core";
import { DisplayValue } from "components/DisplayValue";
import { Surface } from "components/Surface";

export const VoteMetrics = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Surface>
          <DisplayValue title="Current Votes" value="0.000" />
        </Surface>
      </Grid>
      <Grid item xs={2}>
        <Surface>
          <DisplayValue title="Delegated Votes" value="0.000" />
        </Surface>
      </Grid>
    </Grid>
  );
};
