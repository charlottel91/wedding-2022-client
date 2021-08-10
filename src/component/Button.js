import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ButtonBase, Typography} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: '5px',
    paddingBottom: '5px',
    backgroundColor: '#BF8969',
    borderRadius: '3px',
    color: '#F2F2F2',
    '&:hover, &$focusVisible': {
      opacity: 0.5,
      fontWeight: 'bold',
    },
  },
}));

export default function Button({text, onClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonBase onClick={onClick}>
        <Typography component="span" variant="subtitle1" color="inherit">
          {text}
        </Typography>
      </ButtonBase>
    </div>
  );
}
