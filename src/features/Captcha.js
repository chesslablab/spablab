import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography } from '@mui/material';
import * as captcha from 'features/captchaSlice';

const Captcha = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(captcha.init());
  }, [
    dispatch
  ]);

  return <>
    <Typography
      sx={{
        fontWeight: 'bold',
        textDecoration: 'line-through',
        mt: 1,
        mb: 1,
      }}
      align="center"
    >
     {state.captcha.text}
    </Typography>
    <TextField
      fullWidth
      name="captcha"
      label="Enter the CAPTCHA code"
      helperText="Verify that you're a human"
      variant="filled"
      required
    />
  </>;
}

export default Captcha;
