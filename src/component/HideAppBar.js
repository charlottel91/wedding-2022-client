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
import {makeStyles} from '@material-ui/core/styles';

import ConfirmPresence from '../pages/ConfirmPresence';
import Home from '../pages/Home';
import Program from '../pages/Program';
import Sleep from '../pages/Sleep';

const useStyles = makeStyles({
  appBarDesktop: {
    ['@media (max-width:781px)']: {
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
    paddingRight: '2rem',
    color: '#F2F2F2',
    textDecoration: 'none',
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
        {/* <HideOnScroll {...props}> */}
        <AppBar position="fixed" className={classes.appBarDesktopContainer}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.section} variant="h5">
              <NavHashLink
                smooth
                to="/#accueil"
                className={classes.section}
                activeClassName={{color: '#F2F2F2', fontWeight: 'bold'}}
                activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
              >
                Accueil
              </NavHashLink>
            </Typography>
            <Typography className={classes.section} variant="h5">
              <NavHashLink
                smooth
                to="/#programme"
                className={classes.section}
                activeClassName={{color: '#F2F2F2', fontWeight: 'bold'}}
                activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
              >
                Programme
              </NavHashLink>
            </Typography>
            <Typography className={classes.section} variant="h5">
              <NavHashLink
                smooth
                to="/#confirmation-présence"
                className={classes.section}
                activeClassName={{color: '#F2F2F2', fontWeight: 'bold'}}
                activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
              >
                Confirmer ma venue
              </NavHashLink>
            </Typography>
            <Typography className={classes.section} variant="h5">
              <NavHashLink
                smooth
                to="/#où-dormir"
                className={classes.section}
                activeClassName={{color: '#F2F2F2', fontWeight: 'bold'}}
                activeStyle={{color: '#F2F2F2', fontWeight: 'bold'}}
              >
                Se loger
              </NavHashLink>
            </Typography>
            <Typography className={classes.section} variant="h5">
              <a href="#urne">Urne</a>
            </Typography>
            <Typography
              className={classes.section}
              onClick={handleLogOut}
              variant="button"
            >
              Se déconnecter
            </Typography>
          </Toolbar>
        </AppBar>
        {/* </HideOnScroll> */}
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
      </div>
      <div className={classes.appBarMobile}>
        <AppBar position="fixed" className={classes.appBarMobileContainer}>
          <Toolbar className={classes.toolbar}>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              <HomeIcon style={{fontSize: '2.5em'}} />
            </NavLink>
            <NavLink
              to="/programme"
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              <ReceiptIcon style={{fontSize: '2.5em'}} />
            </NavLink>
            <NavLink
              to="/confirmation-présence"
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              <CheckCircleOutlineIcon style={{fontSize: '2.5em'}} />
            </NavLink>
            <NavLink
              to="/où-dormir"
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              <HotelIcon style={{fontSize: '2.5em'}} />
            </NavLink>
          </Toolbar>
        </AppBar>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/confirmation-présence" component={ConfirmPresence} />
        <PrivateRoute exact path="/programme" component={Program} />
        <PrivateRoute exact path="/où-dormir" component={Sleep} />
      </div>
    </React.Fragment>
  );
}
