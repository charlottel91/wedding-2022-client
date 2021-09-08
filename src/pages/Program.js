/* eslint-disable max-len */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Container, Typography} from '@material-ui/core';

import Cocktail from '../assets/cocktail.svg';
import Church from '../assets/church.svg';
import Party from '../assets/party.svg';
import Dinner from '../assets/dinner.svg';
import Place from '../assets/bg_grandEcherat.png';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    ['@media (min-width:780px)']: {
      padding: '6rem 1rem',
    },
    ['@media (max-width:780px)']: {
      padding: '1rem',
    },
  },
  title: {
    marginBottom: '1rem',
  },
  containerPage: {
    ['@media (max-width:780px)']: {
      flex: 3,
      paddingBottom: '1.5rem',
      justifyContent: 'center',
    },
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  containerIcons: {
    display: 'flex',
    flexDirection: 'row',
    ['@media (max-width:780px)']: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  },
  section: {
    flex: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: '100%',
    margin: 'auto',
  },
  line: {
    margin: '2rem 15rem',
    height: '4px',
    backgroundColor: '#595622',
    ['@media (max-width:780px)']: {
      display: 'none',
    },
  },
  containerImage: {
    zIndex: 0,
    position: 'absolute',
    bottom: '-97vh',
    right: 0,
    width: '30%',
    ['@media (max-width:780px)']: {
      display: 'none',
    },
  },
});

const Program = () => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h2">
          Programme
        </Typography>
        <div className={classes.containerPage}>
          <div className={classes.containerIcons}>
            <Container className={classes.section}>
              <img src={Church} className={classes.img} alt="Eglise" />
              <Typography variant="h4">15h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Cocktail} className={classes.img} alt="Toast" />
              <Typography variant="h4">17h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Dinner} className={classes.img} alt="Toast" />
              <Typography variant="h4">20h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Party} className={classes.img} alt="Toast" />
              <Typography variant="h4">23h00</Typography>
            </Container>
          </div>
          <div className={classes.line} />
          <Typography variant="body1">
            Nous vous invitons à nous rejoindre à 15h pour célébrer la cérémonie
            religieuse en l&apos;
            <Box style={{color: '#1A8205', display: 'inline', fontWeight: 'bolder'}}>
              Eglise de Bellac
            </Box>
            . Nous nous dirigerons ensuite vers le{' '}
            <Box style={{color: '#1A8205', display: 'inline', fontWeight: 'bolder'}}>
              Domaine du Grand Echérat{' '}
            </Box>
            (commune de Blond - 87300) pour le cocktail, suivi par le dîner. Nous
            continuerons la soirée jusqu&apos;au bout de la nuit.
            <br />
            Le lendemain, un brunch vous sera servi à partir de 12h.
          </Typography>
        </div>
      </Container>
      <img src={Place} className={classes.containerImage} />
    </div>
  );
};

export default Program;
