import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context';
import PropTypes from 'prop-types';

import PrivateRoute from '../routing/PrivateRoute';

import ConfirmPresence from '../pages/ConfirmPresence';
import Home from '../pages/Home';

import {
  AppBar,
  Container,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

function HideOnScroll(props) {
  const {children, window} = props;
  const trigger = useScrollTrigger({target: window ? window() : undefined});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles({
  toolbar: {
    background: 'linear-gradient(45deg, #EFF9ED 10%, #1a6c09 60%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  section: {
    paddingRight: '2rem',
    fontSize: '1.5em',
  },
  container: {
    border: 'solid 2px black',
    width: '100%',
    padding: 50,
  },
});

export default function HideAppBar(props) {
  const classes = useStyles();
  const {dispatch} = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem('token');
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <NavLink to="/" className={classes.section}>
              Programme
            </NavLink>
            <NavLink to="/confirmation" className={classes.section}>
              Confirmer ma venue
            </NavLink>
            <Typography className={classes.section} variant="h6">
              Se loger
            </Typography>
            <Typography className={classes.section} variant="h6" onClick={handleLogOut}>
              Se déconnecter
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/confirmation" component={ConfirmPresence} />
      </Container>
    </React.Fragment>
  );
}
