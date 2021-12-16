import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import modeNames from '../constants/modeNames';

const MainBreadcrumbs = ({props}) => {
  const state = useSelector(state => state);

  if (state.mode.current === modeNames.ANALYSIS) {
    return (
      <Typography style={{color:"#2f4f4f"}} variant="h6" component="div">
        Analysis board
      </Typography>
    );
  } else if (state.mode.current === modeNames.LOADFEN) {
    return (
      <Typography style={{color:"#2f4f4f"}} variant="h6" component="div">
        FEN board
      </Typography>
    );
  } else if (state.mode.current === modeNames.PLAYFRIEND) {
    return (
      <Typography style={{color:"#2f4f4f"}} variant="h6" component="div">
        Invited friend
      </Typography>
    );
  }

  return null;
}

export default MainBreadcrumbs;
