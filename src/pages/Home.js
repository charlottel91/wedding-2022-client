import React, {useContext} from 'react';
import {AuthContext} from '../context';

import {Button, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';

import Countdown from '../component/Countdown';
import ImgWeb from '../assets/home_web.jpg';
import ImgIpad from '../assets/home_iPad.jpg';
import ImgPhone from '../assets/home_phone.jpg';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'black',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    ['@media (max-width:780px)']: {
      minHeight: '100%',
    },
  },
  image_desktop: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    // ['@media (min-width:780px)']: {
    //   display: 'none',
    // },
  },
  image_ipad: {
    // ['@media (max-width:780px && min-width:375px)']: {
    //   display: 'none',
    // },
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  image_phone: {
    // ['@media (max-width:375px)']: {
    //   display: 'none',
    // },
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  title: {
    zIndex: 1,
    flex: '3',
    display: 'flex',
    alignItems: 'center',
    color: '#F2F2F2',
    ['@media (max-width:780px)']: {
      flex: '2',
    },
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
  logout: {
    ['@media (min-width:780px)']: {
      display: 'none',
    },
    ['@media (max-width:780px)']: {
      zIndex: 1,
      position: 'absolute',
      top: '1.5rem',
      right: '0.5rem',
      color: '#F2F2F2',
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showImgWeb = useMediaQuery(theme.breakpoints.up('lg'));
  const showImgPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const {dispatch} = useContext(AuthContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('token');
  };

  return (
    <React.Fragment>
      {showImgWeb && <img src={ImgWeb} className={classes.image_desktop} />}
      {!showImgPhone && !showImgWeb ? (
        <img src={ImgIpad} className={classes.image_ipad} />
      ) : null}
      {showImgPhone && <img src={ImgPhone} className={classes.image_phone} />}
      <div className={classes.container}>
        <Typography className={classes.title} variant="h1">
          Charlotte et Florian
        </Typography>
        <div className={classes.countdown}>
          <Countdown />
        </div>
        <Button className={classes.logout} onClick={(e) => handleLogOut(e)}>
          <ExitToAppIcon />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
