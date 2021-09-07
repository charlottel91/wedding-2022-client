import React, {useContext} from 'react';
import {AuthContext} from '../context';
import {NavLink} from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import {NavHashLink} from 'react-router-hash-link';

import {AppBar, Toolbar, Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HotelIcon from '@material-ui/icons/Hotel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles} from '@material-ui/core/styles';

import ConfirmPresence from '../pages/ConfirmPresence';
import Home from '../pages/Home';
import Program from '../pages/Program';
import Sleep from '../pages/Sleep';
import BulletBox from '../pages/BulletBox';

const useStyles = makeStyles({
  appBarDesktop: {
    ['@media (max-width:780px)']: {
      display: 'none',
    },
  },
  appBarMobile: {
    ['@media (min-width:780px)']: {
      display: 'none',
    },
  },
  appBarDesktopContainer: {
    width: '100%',
    backgroundColor: 'rgba(1, 1, 1, 0)',
  },
  appBarMobileContainer: {
    backgroundColor: 'rgba(1, 1, 1, 0)',
    top: 'auto',
    bottom: '0',
  },
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0,  0.7)',
    display: 'flex',
    ['@media (min-width:780px)']: {
      justifyContent: 'center',
    },
    ['@media (max-width:780px)']: {
      justifyContent: 'space-between',
    },
  },
  section: {
    paddingRight: '0.5em',
    color: '#F2F2F2',
    textDecoration: 'none',
  },
  logout: {
    position: 'absolute',
    right: '2rem',
  },
  icon: {
    color: '#F2F2F2',
    opacity: '0.7',
    '&:hover': {
      opacity: '1',
    },
  },
});

export default function HideAppBar() {
  const classes = useStyles();
  const {dispatch} = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('token');
  };
  return (
    <React.Fragment>
      <div className={classes.appBarDesktop}>
        <AppBar position="fixed" className={classes.appBarDesktopContainer}>
          <Toolbar className={classes.toolbar}>
            <NavHashLink
              smooth
              to="/#accueil"
              className={classes.section}
              activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
            >
              <Typography className={classes.section} variant="h5">
                Accueil
              </Typography>
            </NavHashLink>
            <NavHashLink
              smooth
              to="/#programme"
              className={classes.section}
              activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
            >
              <Typography className={classes.section} variant="h5">
                Programme
              </Typography>
            </NavHashLink>
            <NavHashLink
              smooth
              to="/#confirmation-présence"
              className={classes.section}
              activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
            >
              <Typography className={classes.section} variant="h5">
                Confirmer ma venue
              </Typography>
            </NavHashLink>
            <NavHashLink
              smooth
              to="/#où-dormir"
              className={classes.section}
              activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
            >
              <Typography className={classes.section} variant="h5">
                Se loger
              </Typography>
            </NavHashLink>
            <NavHashLink
              smooth
              to="/#urne"
              className={classes.section}
              activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
            >
              <Typography className={classes.section} variant="h5">
                Urne
              </Typography>
            </NavHashLink>
            <Typography
              className={classes.logout}
              onClick={handleLogOut}
              variant="button"
            >
              Se déconnecter
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="accueil">
          <Home />
        </div>
        <div id="programme">
          <Program />
        </div>
        <div id="confirmation-présence">
          <ConfirmPresence />
        </div>
        <div id="où-dormir">
          <Sleep />
        </div>
        <div id="urne">
          <BulletBox />
        </div>
      </div>
      <div className={classes.appBarMobile}>
        <AppBar position="fixed" className={classes.appBarMobileContainer}>
          <Toolbar className={classes.toolbar}>
            <NavLink
              to="/programme"
              activeStyle={{
                opacity: 1,
              }}
            >
              <ReceiptIcon className={classes.icon} />
            </NavLink>
            <NavLink
              to="/confirmation-présence"
              activeStyle={{
                opacity: 1,
              }}
            >
              <CheckCircleOutlineIcon className={classes.icon} />
            </NavLink>
            <NavLink
              exact
              to="/"
              activeStyle={{
                opacity: 1,
              }}
            >
              <HomeIcon className={classes.icon} />
            </NavLink>
            <NavLink
              to="/où-dormir"
              activeStyle={{
                opacity: 1,
              }}
            >
              <HotelIcon className={classes.icon} />
            </NavLink>
            <NavLink
              to="/urne"
              activeStyle={{
                opacity: 1,
              }}
            >
              <MailIcon className={classes.icon} />
            </NavLink>
          </Toolbar>
        </AppBar>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/confirmation-présence" component={ConfirmPresence} />
        <PrivateRoute exact path="/programme" component={Program} />
        <PrivateRoute exact path="/où-dormir" component={Sleep} />
        <PrivateRoute exact path="/urne" component={BulletBox} />
      </div>
    </React.Fragment>
  );
}
