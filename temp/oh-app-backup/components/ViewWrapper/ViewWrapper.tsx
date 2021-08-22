import { Box, makeStyles } from "@material-ui/core";
import { DRAWER_WIDTH } from "config/constants/values";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH,
    },
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));

export const ViewWrapper = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.wrapper}>{children}</Box>;
};
