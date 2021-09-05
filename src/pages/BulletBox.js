import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import PiggyBank from '../assets/piggy_bank.svg';
import ImgWeb from '../assets/home_web.jpg';
import ImgIpad from '../assets/home_iPad.jpg';
import ImgPhone from '../assets/home_iPhone.jpg';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  image_desktop: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  image_ipad: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  image_phone: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  title: {
    zIndex: 1,
    marginBottom: '1rem',
    color: '#F2F2F2',
    ['@media (min-width:780px)']: {
      paddingTop: '6rem',
    },
    ['@media (max-width:780px)']: {
      padding: '1rem',
    },
  },
  containerPage: {
    zIndex: 1,
    margin: 'auto',
    padding: '1rem',
    backgroundColor: 'rgb(0, 0, 0, 0.6)',
  },
  text: {
    color: '#F2F2F2',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const BulletBox = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showImgWeb = useMediaQuery(theme.breakpoints.up('lg'));
  const showImgPhone = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container className={classes.container}>
      {showImgWeb && <img src={ImgWeb} className={classes.image_desktop} />}
      {!showImgPhone && !showImgWeb ? (
        <img src={ImgIpad} className={classes.image_ipad} />
      ) : null}
      {showImgPhone && <img src={ImgPhone} className={classes.image_phone} />}
      <Typography className={classes.title} variant="h2">
        Urne
      </Typography>
      <Container className={classes.containerPage}>
        <Typography className={classes.text} variant="body1">
          Si vous souhaitez participer à notre voyage de noce dont la destination
          n&apos;est pas encore connue mais sera évidemment dépaysante, une urne digitale
          est à votre disposition en cliquant sur l&apos;icone ci-dessus.
        </Typography>
        <Container className={classes.link}>
          <a href="">
            <img src={PiggyBank} />
          </a>
        </Container>
        <Typography className={classes.text} variant="body1">
          Pour les moins digitalisés d&apos;entre vous, une urne sera également à votre
          disposition le jour J.
        </Typography>
      </Container>
    </Container>
  );
};

export default BulletBox;
