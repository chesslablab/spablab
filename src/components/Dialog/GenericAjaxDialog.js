import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import loading from '../../assets/img/loading.gif';

const useStyles = makeStyles({
  loading: {
    textAlign: 'center',
  },
});

const GenericAjaxDialog = ({ props }) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  return (
    <Dialog open={state.genericAjaxDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <div className={classes.loading}>
          <img src={loading} alt="loading" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GenericAjaxDialog;
