import * as React from 'react';
import { AppBar, Button, Dialog, IconButton, Toolbar, Typography, Slide } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import Videos from "../Videos.js";
import { useDispatch, useSelector } from "react-redux";
import watchDialogActionTypes from "../../constants/dialog/watchDialogActionTypes";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WatchDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.watchDialog.open}
      onClose={() => dispatch({ type: watchDialogActionTypes.CLOSE })}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch({ type: watchDialogActionTypes.CLOSE })}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Watch
          </Typography>
          <Button autoFocus color="inherit" onClick={() => dispatch({ type: watchDialogActionTypes.CLOSE })}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Videos />
    </Dialog>
  );
};

export default WatchDialog;
