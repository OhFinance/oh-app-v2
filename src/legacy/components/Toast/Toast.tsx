// import { makeStyles } from "@material-ui/core";
// import { Alert, AlertTitle } from "@material-ui/lab";
import { FC, useCallback, useEffect, useRef } from 'react';
// import { CSSTransition } from "react-transition-group";
import { ToastProps } from './types';

export const Toast: FC<ToastProps> = ({ toast, onRemove, duration, style, ...props }) => {
  // const classes = useStyles();
  const timer = useRef<number>();
  const ref = useRef(null);
  const removeHandler = useRef(onRemove);
  const { id, title, description, type } = toast;

  const handleRemove = useCallback(() => removeHandler.current(id), [id, removeHandler]);

  const handleMouseEnter = () => {
    clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, duration);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, duration);

    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, duration, handleRemove]);

  /* return (
    <CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
      <div
        className={classes.toast}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Alert severity={type}>
          <AlertTitle>{title}</AlertTitle>
          {description}
        </Alert>
      </div>
    </CSSTransition>
  ); */

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* <Alert severity={type}> */}
      <p>{title}</p>
      <p>{description}</p>
      {/* </Alert> */}
    </div>
  );
};
