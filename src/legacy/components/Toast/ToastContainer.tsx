// import { Box, makeStyles, Theme, useTheme } from "@material-ui/core";
import { TOAST_POSITION } from 'config/constants/values';
import { FC } from 'react';
// import { TransitionGroup } from "react-transition-group";
import { Toast } from './Toast';
import { ToastContainerProps } from './types';

/* const useStyles = makeStyles((theme) => ({
  container: {
    "& .enter, & .appear": {
      opacity: 0.01,
    },
    "& .enter.enter-active, & .appear.appear-active": {
      opacity: 1,
      transition: "opacity 250ms ease-in",
    },
    "& .exit": {
      opacity: 1,
    },
    "& .exit.exit-active": {
      opacity: 0.01,
      transition: "opacity 250ms ease-out",
    },
  },
})); */

export const ToastContainer: FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  spacing = 64,
  duration = 6000,
}) => {
  /* const theme = useTheme<Theme>();
  const classes = useStyles(); */

  return (
    <div /* className={classes.container} */>
      {/* <TransitionGroup> */}
      <div>
        {toasts.map((toast, i) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
            duration={duration}
            style={{
              // zIndex: (theme.zIndex.snackbar - i).toString(),
              zIndex: i.toString(),
              bottom: `${TOAST_POSITION + i * spacing}px`,
            }}
          />
        ))}
      </div>
      {/* </TransitionGroup> */}
    </div>
  );
};
