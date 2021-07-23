import React, {useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../context';
import jwtDecode from 'jwt-decode';

import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';

import Notification from '../component/Notification';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({history}) {
  const classes = useStyles();
  const {dispatch, state} = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: 'LOADING_START'});
    try {
      axios.defaults.timeout = 50000;
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/signin`,
        user
      );
      localStorage.setItem('token', data.token);
      const decodeToken = jwtDecode(data.token);
      dispatch({type: 'LOGIN', payload: decodeToken.user});
      history.replace('/');
    } catch ({response}) {
      setError(response.data);
    }
    setTimeout(() => {
      dispatch({type: 'LOADING_STOP'});
      setError();
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connectez-vous
        </Typography>
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
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {state.loading ? <CircularProgress /> : 'Se connecter'}
          </Button>
        </form>
        {error && <Notification type="error" text={error} />}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
