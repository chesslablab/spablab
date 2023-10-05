import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const PositionEval = () => {
  const stateNav = useSelector(state => state.nav);

  const statePositionEval = useSelector(state => state.positionEval);

  if (stateNav.dialogs.settings.fields.eval === 'on') {
    return (
      <Typography
        sx={{mt: 1}}
        align="center"
        variant="body2"
      >
        {statePositionEval.eval?.meaning}
      </Typography>
    );
  }

  return null;
}

export default PositionEval;
