import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from './Button';

const useStyles = makeStyles({
  root: {
    marginRight: '2rem',
    maxWidth: '10rem',
  },
  crossIcon: {
    float: 'right',
  },
});

export default function SimpleCard({
  fistname,
  lastname,
  child,
  vegetarian,
  brunch,
  onClickModify,
  deleteGuest,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CancelIcon className={classes.crossIcon} onClick={deleteGuest} />
      <CardContent>
        <Typography variant="h5">
          {fistname.charAt(0).toUpperCase() + fistname.slice(1)}{' '}
          {lastname.charAt(0).toUpperCase() + lastname.slice(1)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {child}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {vegetarian}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {brunch}
        </Typography>
      </CardContent>
      <Button text="Modifier" onClick={onClickModify} />
    </Card>
  );
}
