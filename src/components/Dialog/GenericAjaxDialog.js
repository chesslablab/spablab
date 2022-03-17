import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent } from '@mui/material';
import GenericAjaxLoader from '../AjaxLoader/GenericAjaxLoader.js';

const GenericAjaxDialog = ({ props }) => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.genericAjaxDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <GenericAjaxLoader />
      </DialogContent>
    </Dialog>
  );
}

export default GenericAjaxDialog;
