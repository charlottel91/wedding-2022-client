import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Typography} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {Button} from './index';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    // width: '100%',
    // height: '100%'
    // maxWidth: 500,
    // flexBasis: 'calc(33.33333% - 0.83333rem)',
    // minHeight: '5rem',
    // margin: '0.625rem 0'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  crossIcon: {
    float: 'right',
  },
});

export default function SimpleCard({
  title,
  child,
  vegetarian,
  brunch,
  registered,
  onClickModify,
  deleteGuest,
}) {
  const classes = useStyles();
  console.log(registered);

  return (
    <Card className={classes.root}>
      <CancelIcon className={classes.crossIcon} onClick={deleteGuest} />
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
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
      {registered === null && (
        <CardActions>
          <Button text="Modifier" onClick={onClickModify} />
        </CardActions>
      )}
      {registered === true && (
        <CardActions>
          <Typography>Déjà enregistré.e</Typography>
        </CardActions>
      )}
      {registered === false && (
        <CardActions>
          <Typography>Enregistré.e</Typography>
        </CardActions>
      )}
    </Card>
  );
}
