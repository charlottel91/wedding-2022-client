import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography} from '@material-ui/core';

import Cheers from '../assets/cheers.svg';
import Church from '../assets/church.svg';
import Dancefloor from '../assets/dance-floor.svg';
import Plates from '../assets/plate.svg';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    minHeight: '100vh',
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '2rem',
  },
  img: {
    width: '40%',
  },
  line: {
    margin: '2rem 15rem',
    height: '4px',
    backgroundColor: '#595622',
  },
  body2: {
    fontStyle: 'italic',
  },
  adress: {
    display: 'flex',
    flexDirection: 'row',
  },
  typo_adress: {
    margin: 'auto',
  },
});

const Program = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.firstContainer}>
        <Container className={classes.section}>
          <img src={Church} className={classes.img} alt="Eglise" />
          <Typography variant="h4">15h</Typography>
          <Typography className={classes.body2} variant="body2">
            Eglise Notre Dame
            <br />
            87300 Bellac
          </Typography>
        </Container>
        <Container className={classes.section}>
          <img src={Cheers} className={classes.img} alt="Toast" />
          <Typography variant="h4">17h *</Typography>
        </Container>
        <Container className={classes.section}>
          <img src={Plates} className={classes.img} alt="Toast" />
          <Typography variant="h4">20h *</Typography>
        </Container>
        <Container className={classes.section}>
          <img src={Dancefloor} className={classes.img} alt="Toast" />
          <Typography variant="h4">23h *</Typography>
        </Container>
      </div>
      <div className={classes.line} />
      <div className={classes.adress}>
        <Typography className={classes.typo_adress}>
          Après la cérémonie, nous nous retrouverons au Domaine du Grand Echérat, 87 300
          Blond.{' '}
        </Typography>
      </div>
    </div>
  );
};

export default Program;
