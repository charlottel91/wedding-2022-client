import React from 'react';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Countdown from './Countdown';

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'right',
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h1">
        Charlotte et Florian
      </Typography>
      <div className={classes.countdown}>
        <Countdown />
      </div>
    </div>
  );
}
