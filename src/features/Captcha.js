import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

const Captcha = ({ props }) => {
  const [code, setCode] = useState('');

  const [solution, setSolution] = useState('');

  useEffect(() => {
    setCode(genCode(6))
  }, []);

  useEffect(() => {
    props.code = code;
    props.solution = solution;
  }, [props, code, solution]);

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

  const handleCaptchaChange = (event) => {
    setSolution(event.target.value);
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
      variant="h6"
    >
     {code}
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
