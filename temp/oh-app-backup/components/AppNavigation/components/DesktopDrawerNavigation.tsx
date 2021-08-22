import { Drawer, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { DRAWER_WIDTH } from "config/constants/values";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
}));

export const DesktopDrawerNavigation = ({ children }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="left" variant="permanent" className={classes.drawer} open>
      {children}
    </Drawer>
  );
};
