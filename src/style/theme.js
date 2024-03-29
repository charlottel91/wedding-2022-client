/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {createTheme} from '@material-ui/core/styles';
import Allison from '../fonts/Allison_Script.ttf';

const allison = {
  fontFamily: 'Allison',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
   local('Allison'),
   local('Allison'),
   url(${Allison}) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Open Sans"',
      'Roboto',
      'Allison',
      'BrandonGrotesque',
      'sans-serif',
    ].join(','),
    h1: {
      ['@media (min-width:780px)']: {
        fontSize: '9em',
      },
      fontSize: '6em',
      fontFamily: '"Allison", Open Sans',
    },
    h2: {
      ['@media (min-width:780px)']: {
        fontSize: '2em',
        fontFamily: 'Montserrat, sans-serif',
      },
      fontSize: '1.5em',
      textAlign: 'center',
    },
    h3: {
      fontSize: '1rem',
      fontFamily: 'Montserrat, sans-serif',
      color: '#595622',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '3em',
      fontFamily: '"Allison", Open Sans',
      textAlign: 'center',
    },
    h5: {
      fontSize: '1rem',
      fontFamily: 'Montserrat, sans-serif',
      '&:hover': {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
      },
      ['@media (max-width:780px)']: {
        display: 'none',
      },
    },
    body1: {
      ['@media (max-width:415px)']: {
        fontSize: '0.7em',
        padding: '1rem',
      },
      fontSize: '1rem',
      fontFamily: 'Montserrat, sans-serif',
    },
    body2: {
      fontSize: '0.9rem',
      fontFamily: 'Montserrat, sans-serif',
      ['@media (max-width:370px)']: {
        fontSize: '0.7em',
      },
    },
    button: {
      fontSize: '0.6em',
      fontFamily: 'Montserrat, sans-serif',
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 'bold',
      },
    },
  },
});

export default theme;
