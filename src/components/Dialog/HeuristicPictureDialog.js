import html2canvas from 'html2canvas';
import * as React from 'react';
import { Alert, AppBar, Button, Dialog, IconButton, Toolbar, Typography, Slide } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import HeuristicPicture from "../HeuristicPicture.js";
import { useDispatch, useSelector } from "react-redux";
import heuristicPictureDialogActionTypes from "../../constants/dialog/heuristicPictureDialogActionTypes";

const handleDownloadImage = async () => {
  const heuristicPicture = document.getElementsByClassName('heuristic-picture')[0];
  const canvas = await html2canvas(heuristicPicture, {
    logging: false,
    width: heuristicPicture.clientWidth,
    height: heuristicPicture.clientHeight
  });
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png', 1);
  a.download = "heuristics.png";
  a.click();
  a.remove();
}

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
      onClose={() => dispatch({ type: heuristicPictureDialogActionTypes.CLOSE })}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
       <Toolbar>
         <IconButton
           edge="start"
           color="inherit"
           onClick={() => dispatch({ type: heuristicPictureDialogActionTypes.CLOSE })}
           aria-label="close"
         >
           <CloseIcon />
         </IconButton>
         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
           Heuristic Picture
         </Typography>
         <Button color="inherit" onClick={() => handleDownloadImage()}>
           Download
         </Button>
         <Button autoFocus color="inherit" onClick={() => dispatch({ type: heuristicPictureDialogActionTypes.CLOSE })}>
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
