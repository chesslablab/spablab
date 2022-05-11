import * as React from 'react';
import { Alert, AppBar, Button, Dialog, IconButton, Toolbar, Typography, Slide } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
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
           Watch amazing videos!
         </Typography>
         <Button autoFocus color="inherit" onClick={() => dispatch({ type: watchDialogActionTypes.CLOSE })}>
           Close
         </Button>
       </Toolbar>
     </AppBar>
     <Alert
       className="info-alert"
       severity="info"
       style={{ margin: 15 }}
     >
       Would you want your videos to be listed here? Please follow <a href="https://twitter.com/programarivm" style={{ textDecoration: 'none' }}>@programarivm</a> on Twitter and send a DM. Thank you!
     </Alert>
    </Dialog>
  );
};

export default WatchDialog;
