import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const StockfishEval = () => {
  const stateNav = useSelector(state => state.nav);

  const stateStockfishEval = useSelector(state => state.stockfishEval);

  if (stateNav.dialogs.settings.fields.eval === 'on') {
    return (
      <Typography
        sx={{ mt: 1, fontWeight: 'bold' }}
        align="center"
        variant="body2"
      >
        {stateStockfishEval.eval?.meaning}
      </Typography>
    );
  }

  return null;
}

export default StockfishEval;
