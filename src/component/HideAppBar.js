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
    shaddow: 'none',
    backgroundColor: '#F4EDDE',
    color: 'white',
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
    fontSize: '1em',
    color: 'brown',
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
          <NavLink to="/" className={classes.section}>
            Accueil
          </NavLink>
          <NavLink to="/programme" className={classes.section}>
            Programme
          </NavLink>
          <NavLink to="/confirmation" className={classes.section}>
            Confirmer ma venue
          </NavLink>
          <NavLink to="/oùdormir" className={classes.section} variant="h2">
            Se loger
          </NavLink>
          <Typography className={classes.section} variant="h2" onClick={handleLogOut}>
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
