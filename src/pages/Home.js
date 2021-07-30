import React, {useContext} from 'react';
import {AuthContext} from '../context';

import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Countdown from '../component/Countdown';
import Saul from '../assets/saul_pleureur.png';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    backgroundColor: '#F4EDDE',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    ['@media (max-width:780px)']: {
      minHeight: '100%',
    },
  },
  image: {
    zIndex: 1,
    ['@media (min-width:780px)']: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    ['@media (max-width:780px)']: {
      display: 'flex',
      position: 'absolute',
    },
  },
  title: {
    flex: '3',
    display: 'flex',
    alignItems: 'center',
  },
  countdown: {
    flex: '1',
    ['@media (min-width:780px)']: {
      width: '40%',
    },
    ['@media (max-width:780px)']: {
      width: '100%',
    },
  },
  section: {
    marginBottom: '5em',
    ['@media (min-width:780px)']: {
      display: 'none',
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const {dispatch} = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('token');
  };

  return (
    <React.Fragment>
      <img src={Saul} className={classes.image} />
      <div className={classes.container}>
        <Typography className={classes.title} variant="h1">
          Charlotte et Florian
        </Typography>
        <div className={classes.countdown}>
          <Countdown />
        </div>
        <Typography className={classes.section} onClick={handleLogOut} variant="button">
          Se déconnecter
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Home;
