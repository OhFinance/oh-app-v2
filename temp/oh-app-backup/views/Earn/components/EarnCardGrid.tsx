import { Grid } from "@material-ui/core";
import banks from "config/constants/banks";
import { Bank } from 'config/constants/types'
import { EarnCard } from "./EarnCard";

export const EarnCardGrid = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        {banks.map((bank: Bank, i: number) => (
          <EarnCard key={i} bank={bank} />
        ))}
      </Grid>
    </Grid>
  );
};
