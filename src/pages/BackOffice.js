import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import moment from 'moment';

import {Button, Container, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import UsersTable from '../component/UsersTable';
import SignUp from '../component/SignUp';
import ImgWeb from '../assets/home_web.jpg';
import ImgIpad from '../assets/home_pad.jpg';
import ImgPhone from '../assets/home_phone.jpg';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
  },
  image_desktop: {
    zIndex: 0,
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
    position: 'absolute',
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
    textAlign: 'center',
    color: '#FEFEFE',
  },
  button: {
    marginRight: '1rem',
    padding: '0.5rem',
    backgroundColor: '#D99C79',
    color: '#FEFEFE',
    '&:hover, &$focusVisible': {
      backgroundColor: '#BF8969',
      fontWeight: 'bold',
    },
    '&:disabled': {
      backgroundColor: '#BF8969',
      fontWeight: 'bold',
      color: '#FEFEFE',
    },
  },
  content: {
    padding: '1rem',
  },
});

const BackOffice = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showImgWeb = useMediaQuery(theme.breakpoints.up('lg'));
  const showImgPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const [showTable, setShowTable] = useState(false);
  const [users, setUsers] = useState([]);
  const createCsvFileName = () => `data_${moment().format()}.csv`;

  const headers = [
    {label: 'id', key: 'id'},
    {label: 'Prénom', key: 'fistname'},
    {label: 'Nom', key: 'lastname'},
    {label: 'Enfant', key: 'isChild'},
    {label: 'Repas végétarien', key: 'isVegetarian'},
    {label: 'Présence brunch', key: 'presentBrunch'},
  ];

  let data = [];
  users.forEach((user) => {
    data.push({
      id: user.id,
      firstname: user.guests[0].firstname,
      lastname: user.guests[0].lastname,
      isChild: user.guests[0].isChild,
      isVegetarian: user.guests[0].isVegetarian,
      presentBrunch: user.guests[0].presentBrunch,
    });
    for (let i = 1; i < user.guests.length; i++) {
      const guest = user.guests[i];
      data.push({
        id: '',
        firstname: guest.firstname,
        lastname: guest.lastname,
        isChild: guest.isChild,
        isVegetarian: guest.isVegetarian,
        presentBrunch: guest.presentBrunch,
      });
    }
  });

  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`);
      setUsers(
        data.map((user) => {
          return {
            id: user.name,
            guests: user.guests.map((guest) => {
              return {
                firstname: guest.firstname,
                lastname: guest.lastname,
                isChild: guest.isChild ? 'oui' : 'non',
                isVegetarian: guest.isVegetarian ? 'oui' : 'non',
                presentBrunch: guest.presentBrunch ? 'oui' : 'non',
              };
            }),
          };
        })
      );
    } catch (err) {
      return err;
    }
  };

  const handleClickShowTable = (value) => {
    setShowTable(value);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={classes.container}>
      {showImgWeb && <img src={ImgWeb} className={classes.image_desktop} />}
      {!showImgPhone && !showImgWeb ? (
        <img src={ImgIpad} className={classes.image_ipad} />
      ) : null}
      {showImgPhone && <img src={ImgPhone} className={classes.image_phone} />}
      <div className={classes.containerPage}>
        <Typography className={classes.title} variant="h2">
          Back-office
        </Typography>
        <Container style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
          <Button
            className={classes.button}
            onClick={() => handleClickShowTable(false)}
            disabled={!showTable}
          >
            Ajouter un compte
          </Button>
          <Button
            className={classes.button}
            onClick={() => handleClickShowTable(true)}
            disabled={showTable}
          >
            Tableau des inscrits
          </Button>
          {showTable && (
            <CSVLink
              headers={headers}
              data={data && data}
              filename={createCsvFileName()}
              style={{textDecoration: 'none', outline: 'none'}}
            >
              <Button className={classes.button}>Export CSV</Button>
            </CSVLink>
          )}
        </Container>
        <div className={classes.content}>
          {showTable ? <UsersTable users={data && data} /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default BackOffice;
