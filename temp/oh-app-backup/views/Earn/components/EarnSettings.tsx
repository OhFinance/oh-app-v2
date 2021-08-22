import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewModuleRoundedIcon from "@material-ui/icons/ViewModuleRounded";
import { Flex, useMobile } from "@ohfinance/oh-ui";
import useEarn from "hooks/useEarn";
import { EarnSearchBar } from "./EarnSearchBar";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    height: 40,
  },
}));

export const EarnSettings = () => {
  const classes = useStyles();
  const mobile = useMobile();
  const {displayMode, setCardDisplay, setTableDisplay} = useEarn();

  return (
    <Box mb={2}>
      <Flex justify="space-between" align="center">
        {!mobile && (
          <ButtonGroup color="default">
            <Button 
              className={classes.button} 
              onClick={setTableDisplay}
            >
              <ViewListRoundedIcon color={displayMode === 'table' ? "primary" : "disabled"} />
            </Button>
            <Button 
              className={classes.button} 
              onClick={setCardDisplay}
            >
              <ViewModuleRoundedIcon color={displayMode === 'card' ? "primary" : "disabled"}  />
            </Button>
          </ButtonGroup>
        )}

        <EarnSearchBar />
      </Flex>
    </Box>
  );
};
