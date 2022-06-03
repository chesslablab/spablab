import * as React from 'react';
import { AppBar, Button, Dialog, IconButton, Toolbar, Typography, Slide } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import Videos from "./Videos.js";
import { useDispatch, useSelector } from "react-redux";
import { watchDialogClose } from '../../features/dialog/watchDialogSlice';

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
      onClose={() => dispatch(watchDialogClose())}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(watchDialogClose())}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Watch
          </Typography>
          <Button autoFocus color="inherit" onClick={() => dispatch(watchDialogClose())}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Videos />
    </Dialog>
  );
};

export default WatchDialog;
