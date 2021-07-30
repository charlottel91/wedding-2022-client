import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

import Countdown from './Countdown';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  typography: {
    marginRight: '10rem',
    textAlign: 'right',
    fontSize: '3em',
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.typography}>
        Charlotte
        <br />
        et
        <br />
        Florian
      </Typography>
      <Countdown />
    </div>
  );
}
