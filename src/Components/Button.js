import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

export default function Button({text, onClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonBase
        focusRipple
        focusVisibleClassName={classes.focusVisible}
        onClick={onClick}
      >
        <Typography component="span" variant="subtitle1" color="inherit">
          {text}
        </Typography>
      </ButtonBase>
    </div>
  );
}
