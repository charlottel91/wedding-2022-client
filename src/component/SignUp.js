import React, {useState} from 'react';
import axios from 'axios';

import {Button, CssBaseline, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Notification from '../component/Notification';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
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

export default function SignUp() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [text, setText] = useState();

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.timeout = 50000;
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/signup`,
        user
      );
      setText(data);
    } catch ({response}) {
      setError(response.data);
    }
    setTimeout(() => {
      setLoading(false);
      setText();
      setError();
      setUser({
        name: '',
        password: '',
        password_confirmation: '',
      });
    }, 3000);
  };

  return (
    <div className={classes.container}>
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
