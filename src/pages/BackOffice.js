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
    '&:hover': {
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
    height: '100%',
    padding: '1rem',
    display: 'flex',
  },
});

const BackOffice = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showImgWeb = useMediaQuery(theme.breakpoints.up('lg'));
  const showImgPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [text, setText] = useState();
  const createCsvFileName = () => `data_${moment().format()}.csv`;

  const headers = [
    {label: 'id', key: 'id'},
    {label: 'Prenom', key: 'firstname'},
    {label: 'Nom', key: 'lastname'},
    {label: 'Enfant', key: 'isChild'},
    {label: 'Repas vegetarien', key: 'isVegetarian'},
    {label: 'Presence brunch', key: 'presentBrunch'},
  ];

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.timeout = 50000;
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/signup`,
        user
      );
      getUsers();
      setText(data);
      setUser({
        name: '',
        password: '',
        password_confirmation: '',
      });
    } catch ({response}) {
      setError(response.data);
    }
    setTimeout(() => {
      setLoading(false);
      setText();
      setError();
    }, 2000);
  };

  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`);
      let userTemp = [];
      data.forEach((user) => {
        userTemp.push({
          id: user.name,
          firstname: user.guests[0] ? user.guests[0].firstname : null,
          lastname: user.guests[0] ? user.guests[0].lastname : null,
          isChild: user.guests[0] ? (user.guests[0].isChild ? 'oui' : 'non') : null,
          isVegetarian: user.guests[0]
            ? user.guests[0].isVegetarian === true
              ? 'oui'
              : 'non'
            : null,
          presentBrunch: user.guests[0]
            ? user.guests[0].presentBrunch === true
              ? 'oui'
              : 'non'
            : null,
        });
        if (user.guests.length > 0) {
          for (let i = 1; i < user.guests.length; i++) {
            const guest = user.guests[i];
            userTemp.push({
              id: '',
              firstname: guest.firstname,
              lastname: guest.lastname,
              isChild: guest.isChild ? 'oui' : 'non',
              isVegetarian: guest.isVegetarian ? 'oui' : 'non',
              presentBrunch: guest.presentBrunch ? 'oui' : 'non',
            });
          }
        }
      });
      setUsers(userTemp);
    } catch (err) {
      return err;
    }
  };

  const handleClickShowTable = (value) => {
    setShowTable(value);
  };

  useEffect(() => {
    getUsers();
  }, [loading]);

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
              data={users && users}
              filename={createCsvFileName()}
              style={{textDecoration: 'none', outline: 'none'}}
            >
              <Button className={classes.button}>Export CSV</Button>
            </CSVLink>
          )}
        </Container>
        <div className={classes.content}>
          {showTable ? (
            <UsersTable users={users && users} />
          ) : (
            <SignUp
              user={user}
              loading={loading}
              text={text}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BackOffice;
