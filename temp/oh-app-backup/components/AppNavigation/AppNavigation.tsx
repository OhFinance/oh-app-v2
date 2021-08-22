import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import { AppDrawer } from "components/AppDrawer";
import { DRAWER_WIDTH } from "config/constants/values";
import { FaBars } from "react-icons/fa";
import { MobileDrawerNavigation } from "./components/MobileDrawerNavigation";
import { DesktopDrawerNavigation } from "./components/DesktopDrawerNavigation";
import { AppNavigationToolbar } from "./components/AppNavigationToolbar";
import OhLogo from "assets/img/oh-logo.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    padding: theme.spacing(2),
    // margin: theme.spacing(2),
  },
}));

export const AppNavigation = () => {
  const classes = useStyles();
  const mobile = useMobile();

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar disableGutters>
          <Flex grow align="center" justify="flex-start">
            {mobile && (
              <Fragment>
                <IconButton onClick={() => setOpen(true)}>
                  <FaBars />
                </IconButton>
                <Flex center ml={1}>
                  <img
                    src={OhLogo}
                    alt="oh-finance-logo"
                    width={48}
                    height="auto"
                  />
                </Flex>
              </Fragment>
            )}
          </Flex>

          <AppNavigationToolbar />
        </Toolbar>
      </AppBar>
      {mobile ? (
        <MobileDrawerNavigation
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <AppDrawer />
        </MobileDrawerNavigation>
      ) : (
        <DesktopDrawerNavigation>
          <AppDrawer />
        </DesktopDrawerNavigation>
      )}
    </Fragment>
  );
};
