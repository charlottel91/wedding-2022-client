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
    width: '100%',
    display: 'flex',
    ['@media (min-width:780px)']: {
      minHeight: '100vh',
    },
    ['@media (max-width:780px)']: {
      height: 'calc(100vh - 3.5rem)',
    },
  },
  containerPage: {
    zIndex: 1,
    height: '80vh',
    width: '90%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    padding: '1rem',
  },
  content: {
    margin: 'auto',
    ['@media (min-width:780px)']: {
      padding: '2rem',
    },
  },
  containerIcons: {
    display: 'flex',
    flexDirection: 'row',
    ['@media (max-width:780px)']: {
      flexWrap: 'wrap',
    },
  },
  section: {
    flex: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    width: '100%',
    margin: 'auto',
  },
  line: {
    zIndex: 1,
    margin: '2rem 15rem',
    height: '4px',
    backgroundColor: '#595622',
    ['@media (max-width:780px)']: {
      display: 'none',
    },
  },
  imagePlace: {
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
    <div className={classes.container}>
      <div className={classes.containerPage}>
        <Typography className={classes.title} variant="h2">
          Programme
        </Typography>
        <Container className={classes.content}>
          <div className={classes.containerIcons}>
            <Container className={classes.section}>
              <img src={Church} className={classes.icon} alt="Eglise" />
              <Typography variant="h4">15h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Cocktail} className={classes.icon} alt="Toast" />
              <Typography variant="h4">17h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Dinner} className={classes.icon} alt="Toast" />
              <Typography variant="h4">20h00</Typography>
            </Container>
            <Container className={classes.section}>
              <img src={Party} className={classes.icon} alt="Toast" />
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
        </Container>
      </div>
      <img src={Place} className={classes.imagePlace} />
    </div>
  );
};

export default Program;
