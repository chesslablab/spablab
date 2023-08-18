import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const PositionEval = () => {
  const state = useSelector(state => state);

  if (state.nav.dialogs.settings.fields.eval === 'on') {
    return (
      <Typography
        sx={{mt: 1}}
        align="center"
        variant="body2"
      >
        {state.positionEval.eval?.meaning}
      </Typography>
    );
  }

  return null;
}

export default PositionEval;
