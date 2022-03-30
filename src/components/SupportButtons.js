import React from 'react';
import { Button, ButtonGroup, Container, Typography, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: 5,
    padding: 10,
    textAlign:'center',
    color: '#707070',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#505050',
    "&:hover": {
      textDecoration: 'underline',
    },
  }
});

const Support = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <Container className={classes.container}>
      <Typography
        variant="caption"
        component="p"
        align="center"
        style={{ paddingBottom: 10 }}
      >
        Support <a className={classes.link} href="https://github.com/chesslablab">ChesslabLab</a> with a donation.
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
    </Container>
  );
};

export default Support;
