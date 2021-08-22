import { Typography } from "@material-ui/core";
import { DisplayValue } from "components/DisplayValue";
import { Surface } from "components/Surface";

export const DashboardMetrics = () => {
  return (
    <Surface>
      <Typography variant="h6">Metrics</Typography>
      <DisplayValue title="Total Value Locked" value="$1,000,000" />
      <DisplayValue title="My Value Locked" value="$100,000" />
      <DisplayValue title="Total Value Locked" value="$1,000,000" />
    </Surface>
  );
};
