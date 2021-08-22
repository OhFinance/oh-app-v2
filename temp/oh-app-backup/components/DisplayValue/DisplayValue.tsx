import { Box, Typography } from "@material-ui/core";
import { FC } from "react";

export interface DisplayValueProps {
  title: string;
  value: string;
}

export const DisplayValue: FC<DisplayValueProps> = ({ title, value }) => {
  return (
    <Box>
      <Typography variant="body1" align="center">
        <b>{value}</b>
      </Typography>
      <Typography variant="subtitle2" align="center" color="textSecondary">
        {title}
      </Typography>
    </Box>
  );
};
