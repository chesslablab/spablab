import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import modeNames from '../constants/modeNames';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const MainBreadcrumbs = ({props}) => {
  const state = useSelector(state => state);
  const classes = useStyles();

  if (state.mode.current === modeNames.ANALYSIS) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Chess Demo
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          Analysis board
        </Typography>
      </Breadcrumbs>
    );
  } else if (state.mode.current === modeNames.PLAYFRIEND) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Chess Demo
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          Invited friend
        </Typography>
      </Breadcrumbs>
    );
  }

  return null;
}

export default MainBreadcrumbs;
