import React from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress } from '@mui/material';

const ChessOpeningAnalysisAjaxLoader = ({props}) => {
  const state = useSelector(state => state);

  if (state.chessOpeningAjaxLoader.show) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return null;
}

export default ChessOpeningAnalysisAjaxLoader;
