import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Header from '../component/Header';
import Saul from '../assets/saul_pleureur.png';

const useStyles = makeStyles({
  containerHeader: {
    position: 'fixed',
    backgroundColor: '#F4EDDE',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <img src={Saul} className={classes.image} />
      <div className={classes.containerHeader}>
        <Header />
      </div>
    </React.Fragment>
  );
};

export default Home;
