import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../context';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {Notification} from '../components';

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
  const {dispatch} = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/signin`,
        user
      );
      if (response) {
        dispatch.loginData(response.data);
        history.replace('/');
      }
    } catch ({response}) {
      setError(response.status);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.replace('/');
    }
  }, [history]);

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
            Se connecter
          </Button>
        </form>
        {error === 500 && <Notification type="error" text="Une erreur est survenue." />}
        {error === 404 && <Notification type="warning" text="Ce compte n'existe pas." />}
        {error === 400 && (
          <Notification
            type="warning"
            text="L'identifiant et/ou le mot de passe sont invalides."
          />
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
