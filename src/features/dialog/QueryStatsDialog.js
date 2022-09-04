import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as queryStatsDialog from '../../features/dialog/queryStatsDialogSlice';

const QueryStatsDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  return (
    <Dialog open={state.queryStatsDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Query Stats
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(queryStatsDialog.close())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Alert
          className="info-alert"
          severity="info"
        >
          Soon available, please be patient!
        </Alert>
      </DialogContent>
    </Dialog>
  );
};

export default QueryStatsDialog;
