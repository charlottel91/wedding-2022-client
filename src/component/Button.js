import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ButtonBase, Typography} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

export default function Button({disabled, text, onClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonBase
        focusRipple
        focusVisibleClassName={classes.focusVisible}
        onClick={onClick}
        disabled={disabled}
      >
        <Typography component="span" variant="subtitle1" color="inherit">
          {text}
        </Typography>
      </ButtonBase>
    </div>
  );
}
