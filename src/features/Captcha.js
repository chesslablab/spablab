import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

const Captcha = ({ props }) => {
  const [captchaCode, setCaptchaCode] = useState('');

  const [captchaTextField, setCaptchaTextField] = useState('');

  useEffect(() => {
    setCaptchaCode(genCode(8))
  }, []);

  useEffect(() => {
    props.captchaCode = captchaCode;
    props.captchaTextField = captchaTextField;
  }, [props, captchaCode, captchaTextField]);

  const genCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }

    return result;
  };

  const handleCaptchaChange = (event: Event) => {
    setCaptchaTextField(event.target.value);
  };

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
     {captchaCode}
    </Typography>
    <TextField
      fullWidth
      label="Enter the CAPTCHA code"
      helperText="Verify that you're a human"
      variant="filled"
      required
      onChange={handleCaptchaChange}
    />
  </>;
}

export default Captcha;
