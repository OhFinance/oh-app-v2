import { Button } from "@material-ui/core";
import {Balance} from '../Balance'

export const BalanceButton = ({ ...props }) => {
  return (
    <Button variant="contained" {...props}>
      <Balance
        value={0}
        suffix=" OH"
      />
    </Button>
  );
};
