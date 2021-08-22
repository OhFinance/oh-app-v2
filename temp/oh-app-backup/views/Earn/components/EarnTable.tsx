import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableSurface } from "components/TableSurface";
import banks from "config/constants/banks";
import {Bank } from 'config/constants/types'
import { EarnTableRow } from "./EarnTableRow";

export const EarnTable = () => {
  return (
    <TableSurface title="Oh! Banks">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ paddingLeft: 30 }}>#</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Underlying</TableCell>
            <TableCell align="center">Composition</TableCell>
            <TableCell>APY</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banks.map((bank: Bank, i: number) => (
            <EarnTableRow key={i} bank={bank} isLast={i === banks.length - 1} />
          ))}
        </TableBody>
      </Table>
    </TableSurface>
  );
};
