import { Button } from "@material-ui/core";
import { useModal } from "@ohfinance/oh-ui";

export const LoginButton = ({ ...props }) => {
  // const [onPresent] = useModal()

  return (
    <Button variant="contained" color="primary" {...props}>
      Login
    </Button>
  );
};
