import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import paths from "config/constants/paths";
import { Path } from 'config/constants/types'
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { FaHome } from "react-icons/fa";
import HomeIcon from "@material-ui/icons/Home";
import { AppDrawerListIcon } from "./AppDrawerListIcon";

interface SideDrawerLinkProps {
  path: Path;
}

const useStyles = makeStyles((theme) => ({
  hover: {
    cursor: "pointer",
  },
  active: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
    textDecoration: "underline",
    textDecorationColor: theme.palette.primary.main,
    textDecorationThickness: 4,
    textUnderlinePosition: "under",
  },
  link: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
  listItem: {
    padding: theme.spacing(2),
  },
}));

export const AppDrawerList = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, setActive]);

  return (
    <List>
      {paths.map((path: Path, i: number) => (
        <ListItem
          key={i}
          button
          onClick={() => history.push(path.path)}
          className={classes.listItem}
        >
          <ListItemIcon>
            <AppDrawerListIcon path={path.path} />
          </ListItemIcon>
          <ListItemText
            primary={path.name}
            primaryTypographyProps={{ variant: "body1" }}
          />
        </ListItem>
      ))}
    </List>
  );
};
