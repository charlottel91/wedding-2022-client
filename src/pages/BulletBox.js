import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import PiggyBank from '../assets/piggy_bank.svg';
import ImgWeb from '../assets/bulletbox_web.jpg';
import ImgIpad from '../assets/bulletbox_pad.jpg';
import ImgPhone from '../assets/bulletbox_phone.jpg';

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
  image_desktop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  image_ipad: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  image_phone: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    right: 0,
  },
  containerPage: {
    zIndex: 1,
    height: '80vh',
    width: '90%',
    backgroundColor: 'rgb(0, 0, 0, 0.6)',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#F2F2F2',
    padding: '1rem',
  },
  content: {
    margin: 'auto',
    ['@media (min-width:780px)']: {
      padding: '2rem',
    },
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
    <div className={classes.container}>
      {showImgWeb && <img src={ImgWeb} className={classes.image_desktop} />}
      {!showImgPhone && !showImgWeb ? (
        <img src={ImgIpad} className={classes.image_ipad} />
      ) : null}
      {showImgPhone && <img src={ImgPhone} className={classes.image_phone} />}
      <div className={classes.containerPage}>
        <Typography className={classes.title} variant="h2">
          Urne
        </Typography>
        <Container className={classes.content}>
          <Typography className={classes.text} variant="body1">
            Si vous souhaitez participer à notre voyage de noces ou notre futur
            emménagement, une urne digitale est à votre disposition en cliquant sur
            l&apos;icône ci-dessous.
          </Typography>
          <Container className={classes.link}>
            <a
              href="https://www.petit-mariage-entre-amis.fr/mariage-charlotte-et-florian/liste-de-mariage"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PiggyBank} />
            </a>
          </Container>
          <Typography className={classes.text} variant="body1">
            Pour les moins digitalisés d&apos;entre vous, une urne sera également à votre
            disposition le jour J.
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default BulletBox;
