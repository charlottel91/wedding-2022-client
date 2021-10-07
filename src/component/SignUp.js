import React from 'react';

import {Button, CssBaseline, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Notification from '../component/Notification';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2, 0, 2),
    color: '#F2F2F2',
    backgroundColor: '#BF8969',
    '&:hover': {
      backgroundColor: '#D99C79',
      fontWeight: 'bold',
    },
  },
}));

export default function SignUp({user, loading, text, error, handleChange, handleSubmit}) {
  const classes = useStyles();

  return (
    <div component="main" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Identifiant"
            name="name"
            autoComplete="name"
            autoFocus
            value={user.name ? user.name : ''}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password ? user.password : ''}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password confirmation"
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
            value={user.password_confirmation ? user.password_confirmation : ''}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? 'Chargement...' : 'Enregistrer'}
          </Button>
        </form>
        {text && <Notification type="success" text={text} />}
        {error && <Notification type="error" text={error} />}
      </div>
    </div>
  );
}
