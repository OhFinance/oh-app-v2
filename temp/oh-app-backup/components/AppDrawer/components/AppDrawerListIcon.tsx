import { FC, Fragment, useCallback } from "react";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";

export interface AppDrawerListIconProps {
  path: string;
}

export const AppDrawerListIcon: FC<AppDrawerListIconProps> = ({ path }) => {
  const getIcon = useCallback(() => {
    const key = path.slice(1);
    switch (key) {
      case "earn":
        return <MonetizationOnRoundedIcon />;
      case "stake":
        return <AssessmentRoundedIcon />;
      case "vote":
        return <AccountBalanceRoundedIcon />;
      default:
        return <DashboardRoundedIcon />;
    }
  }, [path]);

  return <Fragment>{getIcon()}</Fragment>;
};
