import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

export const VoteView = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Proposal Name</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Add Oh! USDT Bank and Strategies</TableCell>
          <TableCell align="center">
            <Chip label="In Progress" color="primary" />
          </TableCell>
          <TableCell>
            <IconButton>
              <MoreVertRoundedIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>0</TableCell>
          <TableCell>Add Oh! USDC Bank and Strategies</TableCell>
          <TableCell align="center">
            <Chip label="In Progress" color="primary" />
          </TableCell>
          <TableCell>
            <IconButton>
              <MoreVertRoundedIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
