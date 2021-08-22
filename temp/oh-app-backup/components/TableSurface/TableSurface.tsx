import { Box, Divider, TableContainer, Typography } from "@material-ui/core";
import { Surface } from "components/Surface";
import { FC, Fragment } from "react";

const TableSurfaceComponent = ({ children }) => {
  return <Surface p={0}>{children}</Surface>;
};

export interface TableSurfaceProps {
  title?: string;
}

export const TableSurface: FC<TableSurfaceProps> = ({ title, children }) => {
  return (
    <TableContainer component={TableSurfaceComponent}>
      {title && (
        <Fragment>
          <Box p={2}>
            <Typography>
              <b>{title}</b>
            </Typography>
          </Box>
          <Divider />
        </Fragment>
      )}

      {children}
    </TableContainer>
  );
};
