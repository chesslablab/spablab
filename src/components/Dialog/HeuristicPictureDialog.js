import * as React from 'react';
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import HeuristicPicture from "../HeuristicPicture.js";
import { useDispatch, useSelector } from "react-redux";
import heuristicPictureDialogActions from "../../constants/dialog/heuristicPictureDialogActionTypes";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HeuristicPictureDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.heuristicPictureDialog.open}
      onClose={() => dispatch({ type: heuristicPictureDialogActions.CLOSE })}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
       <Toolbar>
         <IconButton
           edge="start"
           color="inherit"
           onClick={() => dispatch({ type: heuristicPictureDialogActions.CLOSE })}
           aria-label="close"
         >
           <CloseIcon />
         </IconButton>
         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
           Heuristic Picture
         </Typography>
         <Button autoFocus color="inherit" onClick={() => dispatch({ type: heuristicPictureDialogActions.CLOSE })}>
           Close
         </Button>
       </Toolbar>
     </AppBar>
     <Alert
       className="info-alert"
       severity="info"
       style={{ margin: 15 }}
     >
       A chess game can be plotted in terms of balance. +1 is the best
       possible evaluation for White and -1 the best possible evaluation for
       Black. Both forces being set to 0 means they're actually offset and,
       therefore, balanced.
     </Alert>
     <HeuristicPicture />
    </Dialog>
  );
};

export default HeuristicPictureDialog;
