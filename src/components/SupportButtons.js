import React from 'react';
import { Button, ButtonGroup, Paper, Typography, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    marginTop: 15,
    padding: 10,
    textAlign:'center'
  },
});

const Support = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="caption"
        component="p"
        align="center"
        style={{ paddingBottom: 10 }}
      >
        Support <a href="https://github.com/chesslablab">ChesslabLab</a> with a donation.
      </Typography>
      <ButtonGroup
        orientation="vertical"
        size="small"
        aria-label="Support"
        fullWidth={matches ? false : true}
      >
        <Button onClick={() => {
           window.open('https://www.paypal.com/donate/?hosted_button_id=GKEANXJD6XUCA');
        }}>
          Donate
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default Support;
