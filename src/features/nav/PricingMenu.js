import React from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';

const PricingMenu = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <Button
      id="Nav-pricing"
      sx={{ pl: 2, justifyContent: 'flex-start' }}
      variant={state.name === navConst.PRICING ? "contained" : "text"}
      startIcon={<CreditCardIcon />}
      onClick={() => dispatch(nav.pricingDialog({ open: true }))}
    >
      Pricing
    </Button>
  );
}

export default PricingMenu;
