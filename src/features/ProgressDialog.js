import { useSelector } from 'react-redux';
import { Box, Dialog, LinearProgress } from '@mui/material';

const ProgressDialog = () => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.progressDialog.open} maxWidth="xs" fullWidth={true}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </Dialog>
  );
}

export default ProgressDialog;
