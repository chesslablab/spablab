import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Slide
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import * as nav from 'features/nav/navSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpDialog = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.dialogs.help.open}
      onClose={() => dispatch(nav.helpDialog({ open: false }))}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
       <Toolbar>
         <IconButton
           edge="start"
           color="inherit"
           onClick={() => dispatch(nav.helpDialog({ open: false }))}
           aria-label="close"
         >
           <CloseIcon />
         </IconButton>
         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
           Help Center
         </Typography>
         <Button autoFocus color="inherit" onClick={() => dispatch(nav.helpDialog({ open: false }))}>
           Close
         </Button>
       </Toolbar>
     </AppBar>
     <Typography variant="h6" style={{ margin: 15 }}>
       Search for answers in the Frequently Asked Questions
     </Typography>
    </Dialog>
  );
};

export default HelpDialog;
