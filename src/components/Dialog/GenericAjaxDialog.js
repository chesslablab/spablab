import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Dialog, DialogContent, LinearProgress } from '@mui/material';

const GenericAjaxDialog = ({ props }) => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.genericAjaxDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default GenericAjaxDialog;
