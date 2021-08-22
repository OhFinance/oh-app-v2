import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const DashboardBalances = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Symbol</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">24hr %</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>USDC</TableCell>
          <TableCell>USD Coin</TableCell>
          <TableCell align="right">100.000</TableCell>
          <TableCell align="right">$1.000</TableCell>
          <TableCell align="right">$100.000</TableCell>
          <TableCell align="right">+0.01 %</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
