'use client'

import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StockfishEval = () => {
  const stateNav = useSelector(state => state.nav);

  const stateStockfishEval = useSelector(state => state.stockfishEval);

  const hint = 'Please make a move for a computer evaluation';

  if (stateNav.dialogs.settings.fields.eval === 'on') {
    return (
      <Card sx={{ ml: 2, mr: 2, mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            Computer evaluation
          </Typography>
          <Typography variant="body2">
            {stateStockfishEval.eval?.meaning ? stateStockfishEval.eval?.meaning : hint}.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default StockfishEval;
