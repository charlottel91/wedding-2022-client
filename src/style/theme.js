/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {createTheme} from '@material-ui/core/styles';
import Allison from '../fonts/Allison_Script.ttf';
import BrandonBlack from '../fonts/brandon-grotesque-black.ttf';
import BrandonBoldItalic from '../fonts/brandon-grotesque-bold-italic.ttf';
import BrandonLightItalic from '../fonts/brandon-grotesque-light-italic.ttf';
import BrandonLight from '../fonts/brandon-grotesque-light.ttf';

const allison = {
  fontFamily: 'Allison',
  // fontStyle: '#7D593F',
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

const brandonBoldItalic = {
  fontFamily: 'BrandonBoldItalic',
  // fontStyle: 'black',
  fontDisplay: 'swap',
  // fontWeight: 100,
  src: `
   local('BrandonBoldItalic'),
   local('BrandonBoldItalic'),
   url(${BrandonBoldItalic}) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const brandonBlack = {
  fontFamily: 'BrandonBlack',
  fontStyle: 'black',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
   local('BrandonBlack'),
   local('BrandonBlack'),
   url(${BrandonBlack}) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const brandonLightItalic = {
  fontFamily: 'BrandonLightItalic',
  fontStyle: 'italic',
  fontDisplay: 'swap',
  src: `
   local('BrandonLightItalic'),
   local('BrandonLightItalic'),
   url(${BrandonLightItalic}) format('ttf')
 `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const brandonLight = {
  fontFamily: 'BrandonLight',


  fontDisplay: 'swap',
  fontWeight: 50,
  src: `
   local('BrandonLight'),
   local('BrandonLight'),
   url(${BrandonLight}) format('ttf')
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
      'BrandonBlack',
      'BrandonLight',
      'BrandonLightItalic',
      'sans-serif',
    ].join(','),
    h1: {
      ['@media (min-width:780px)']: {
        fontSize: '9em',
      },
      fontSize: '6em',
      fontFamily: '"Allison", Open Sans',
    },
    h5: {
      fontSize: '1.5em',
      fontFamily: '"BrandonLight", sans-serif',
      '&:hover': {
        fontFamily: '"BrandonBlack", sans-serif',
      },
      ['@media (max-width:780px)']: {
        display: 'none',
      },
    },
    h4: {
      fontSize: '3em',
      fontFamily: '"BrandonBlack", Open Sans',
    },
    body2: {
      fontSize: '1.2em',
      fontFamily: '"BrandonLightItalic", sans-serif',
    },
    button: {
      fontSize: '0.8em',
      fontFamily: '"BrandonLight", sans-serif',
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 'bold',
      },
    },
  },
});

export default theme;
