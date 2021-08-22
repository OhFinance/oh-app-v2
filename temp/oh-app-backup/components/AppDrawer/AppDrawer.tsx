import { Fragment } from "react";
import {
  Flex,
  HomeButton,
  TelegramButton,
  TwitterButton,
  useVersion,
} from "@ohfinance/oh-ui";
import OhBrand from "assets/img/oh-brand.png";
import { Box, Typography } from "@material-ui/core";
import { AppDrawerList } from "./components/AppDrawerList";

export const AppDrawer = () => {
  const version = useVersion();

  return (
    <Fragment>
      <Flex column grow>
        <Box m={4} mb={4}>
          <Flex center>
            <img
              src={OhBrand}
              alt="oh-finance-brand"
              width="auto"
              height="96px"
            />
          </Flex>
        </Box>
        <AppDrawerList />
      </Flex>
      <Box>
        <Flex center>
          <TwitterButton />
          <TelegramButton />
          <HomeButton />
        </Flex>
        <Typography align="center">Version: v{version}</Typography>
      </Box>
    </Fragment>
  );
};
