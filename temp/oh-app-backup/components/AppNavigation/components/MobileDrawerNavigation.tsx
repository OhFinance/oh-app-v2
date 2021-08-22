import { makeStyles, SwipeableDrawer } from "@material-ui/core";
import { DRAWER_WIDTH } from "config/constants/values";
import { FC, useCallback } from "react";

export interface MobileDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
}));

export const MobileDrawerNavigation: FC<MobileDrawerProps> = ({
  open,
  onOpen,
  onClose,
  children,
}) => {
  const classes = useStyles();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <SwipeableDrawer
      anchor="left"
      className={classes.drawer}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      {children}
    </SwipeableDrawer>
  );
};
