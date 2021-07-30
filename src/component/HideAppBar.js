import React, {useContext} from 'react';
import {AuthContext} from '../context';
import {NavLink} from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';

import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import ConfirmPresence from '../pages/ConfirmPresence';
import Home from '../pages/Home';
import Program from '../pages/Program';
import Sleep from '../pages/Sleep';

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: '#F4EDDE',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  container: {
    margin: 0,
    backgroundColor: '#F4EDDE',
    boxShadow: '0px 2px 0px #F4EDDE',
    width: '100%',
  },
  section: {
    paddingRight: '2rem',
    color: 'brown',
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
      <AppBar position="static" className="appBar">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">
            <NavLink
              exact
              to="/"
              className={classes.section}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/programme"
              className={classes.section}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Programme
            </NavLink>
            <NavLink
              to="/confirmation"
              className={classes.section}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Confirmer ma venue
            </NavLink>
            <NavLink
              to="/oùdormir"
              className={classes.section}
              activeStyle={{
                fontWeight: 'bold',
              }}
            >
              Se loger
            </NavLink>
          </Typography>
          <Typography className={classes.section} onClick={handleLogOut} variant="button">
            Se déconnecter
          </Typography>
        </Toolbar>
      </AppBar>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/confirmation" component={ConfirmPresence} />
      <PrivateRoute exact path="/program" component={Program} />
      <PrivateRoute exact path="/program" component={Sleep} />
    </React.Fragment>
  );
}
