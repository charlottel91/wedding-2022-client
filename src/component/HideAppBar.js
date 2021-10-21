import React, {useContext} from 'react';
import {AuthContext} from '../context';
import {NavLink} from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import {Link} from 'react-scroll';

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
  logout: {
    position: 'absolute',
    right: '2rem',
    cursor: 'pointer',
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
            <Link activeClass="active" className="section" smooth spy to="accueil">
              Accueil
            </Link>
            <Link activeClass="active" className="section" smooth spy to="programme">
              Programme
            </Link>
            <Link
              activeClass="active"
              className="section"
              smooth
              spy
              to="confirmation-presence"
            >
              Confirmer ma venue
            </Link>
            <Link activeClass="active" className="section" smooth spy to="ou-dormir">
              Se loger
            </Link>
            <Link activeClass="active" className="section" smooth spy to="urne">
              Urne
            </Link>
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
        <div id="confirmation-presence">
          <ConfirmPresence />
        </div>
        <div id="ou-dormir">
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
              to="/confirmation-presence"
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
              to="/ou-dormir"
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
        <PrivateRoute exact path="/confirmation-presence" component={ConfirmPresence} />
        <PrivateRoute exact path="/programme" component={Program} />
        <PrivateRoute exact path="/ou-dormir" component={Sleep} />
        <PrivateRoute exact path="/urne" component={BulletBox} />
      </div>
    </React.Fragment>
  );
}
