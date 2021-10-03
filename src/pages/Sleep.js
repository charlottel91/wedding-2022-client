import React from 'react';
import {Box, Card, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import array from '../placeToSleep.json';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FEFEFE',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    overflow: 'auto',
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
  links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    ['@media (min-width:780px)']: {
      padding: '1rem 0',
    },
  },
  card: {
    margin: '0.5rem',
    padding: '1.5rem 0',
    ['@media (max-width:780px)']: {
      padding: '1rem 0',
    },
  },
  line: {
    margin: '2rem 15rem',
    height: '2px',
    backgroundColor: '#595622',
    ['@media (max-width:480px)']: {
      display: 'none',
    },
  },
  box: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    display: 'inline',
    ['@media (max-width:480px)']: {
      fontSize: '0.7rem',
    },
  },
});

const Sleep = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.containerPage}>
        <Typography variant="h2" className={classes.title}>
          Se loger
        </Typography>
        <Container className={classes.content}>
          <Typography variant="body1">
            Vous trouverez, ici, une liste d&apos;hotels ou de logements que vous pouvez
            réserver le week-end de notre mariage. Le haut Limousin n&apos;étant pas une
            région très touristique, nous vous conseillons de vous y prendre suffisamment
            tôt afin d&apos;être au plus près du lieu de réception.
          </Typography>
          <Container className={classes.links}>
            {array.placeToSleep.map((el, i) => {
              return (
                <Card key={i} className={classes.card}>
                  <a href={el.link} target="_blank" rel="noreferrer">
                    <img src={`${el.url}`} alt={el.name} />
                  </a>
                </Card>
              );
            })}
          </Container>
          <Typography variant="body1">
            Pour celles et ceux qui souhaitent déguster sans modération les alcools
            proposés durant la soirée, vous pourrez planter votre tente sur le terrain du
            domaine le samedi soir (les propriétaires ayant gentillement accepté).
            Cependant, nous ne garantissont pas l&apos;accès à une douche.
          </Typography>
          <div className={classes.line} />
          <Typography variant="body1">
            Afin de vous rendre sur les différents lieux, il vous faudra impérativement
            une voiture. Si vous n&apos;êtes pas véhiculé, nous vous invitons à nous le
            communiquer afin que l&apos;on vous trouve une solution. Pour les autres,
            suivez votre GPS !
          </Typography>
          <Typography variant="body1">
            La ville de Bellac est accessible en train. Trois possibilités s&apos;offrent
            à vous de Paris:
            <br />-{' '}
            <Box
              style={{
                color: '#1A8205',
                fontWeight: 'bolder',
                display: 'inline',
                marginLeft: '1rem',
              }}
            >
              Paris Montparnasse - Poitier - (changement) - Bellac
            </Box>{' '}
            <Box className={classes.box}>(entre 3h30 et 4h30)</Box>
            <br /> -{' '}
            <Box
              style={{
                color: '#1A8205',
                fontWeight: 'bolder',
                display: 'inline',
                marginLeft: '1rem',
              }}
            >
              Paris Austerlitz - Limoges - (changement) - Bellac
            </Box>{' '}
            <Box className={classes.box}>(entre 3h30 et 4h30)</Box>
            <br />-{' '}
            <Box
              style={{
                color: '#1A8205',
                fontWeight: 'bolder',
                display: 'inline',
                marginLeft: '1rem',
              }}
            >
              Paris Austerlitz - La Souterraine
            </Box>{' '}
            <Box className={classes.box}>
              (2h30 environ) - Il vous faudra une voiture pour aller jusqu&apos;à Bellac
              (35mn)
            </Box>
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default Sleep;
