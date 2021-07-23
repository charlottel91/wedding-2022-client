import React from 'react';

import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Header from '../component/Header';

const useStyles = makeStyles({
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

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Header />
      </Container>
      <Container className={classes.container}>
        Programme bsjhkvvdklcn:ejbchjvekdh,bcevgrvfckaebfcnjaksgdjcvj sjdb
      </Container>
    </React.Fragment>
  );
};

export default Home;
