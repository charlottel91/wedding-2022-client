import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import {AddCircle} from '@material-ui/icons';
import {Container, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import Notification from '../component/Notification';
import ResponsiveDialog from '../component/ResponsiveDialog';
import SimpleCard from '../component/SimpleCard';
import SpringModal from '../component/SpringModal';
import CarpoolingForm from '../component/CarpoolingForm';

import ImgWeb from '../assets/bulletBox_web.jpeg';
import ImgIpad from '../assets/home_iPad.jpg';
import ImgPhone from '../assets/home_iPhone.jpg';

const useStyles = makeStyles(() => ({
  container: {
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
  containerPage: {
    zIndex: 1,
    padding: '1rem',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 0, 0, 0.6)',
    ['@media (min-width:780px)']: {
      margin: 'auto auto',
    },
    ['@media (max-width:780px)']: {
      width: '90%',
      margin: '1rem auto 1rem auto',
    },
  },
  title: {
    zIndex: 1,
    color: '#F2F2F2',
  },
  text: {
    color: '#F2F2F2',
  },
  addUser: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
    justifyContent: 'start',
    ['@media (max-width:500px)']: {
      flexDirection: 'column',
    },
  },
  containerUsers: {
    margin: 'auto 0',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    overflow: 'auto',
    // ['@media (max-width:380px)']: {
    //   overflow: 'scroll',
    // },
  },
  iconAdd: {
    margin: 'auto 1rem',
    width: 60,
    height: 60,
    color: '#F2F2F2',
    ['@media (max-width:500px)']: {
      margin: 'auto',
    },
  },
  containerCarpooling: {
    marginTop: '1rem',
  },
}));

const ConfirmPresence = () => {
  const classes = useStyles();
  const theme = useTheme();
  const showImgWeb = useMediaQuery(theme.breakpoints.up('lg'));
  const showImgPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const {dispatch, state} = useContext(AuthContext);
  const [guest, setGuest] = useState({
    firstname: '',
    lastname: '',
    isChild: '',
    isVegetarian: '',
    presentBrunch: '',
  });
  const [carpooling, setCarpooling] = useState({
    role: '',
    city: '',
    nb_seat: '',
  });
  const [modifyCarpooling, setModifyCarpooling] = useState(true);
  const [errorCarpooling, setErrorCarpooling] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorChild, setErrorChild] = useState(false);
  const [errorVegetarian, setErrorVegetarian] = useState(false);
  const [errorBrunch, setErrorBrunch] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [index, setIndex] = useState();
  const [errorSaveAllGuests, setErrorSaveAllGuests] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIndex();
  };

  const handleOpenDialog = (i) => {
    setIndex(i);
    setOpenDialog(true);
  };

  const deleteGuest = async () => {
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}/delete/guest`,
        allGuests[index]
      );
      dispatch({type: 'UPDATE_GUESTS', payload: data.guests});
      setAllGuests(data.guests);
    } catch ({response}) {
      setErrorSaveAllGuests(response);
    }
    handleCloseDialog();
    setTimeout(() => {
      setErrorSaveAllGuests();
    }, 3000);
  };

  const handleOpenForm = () => {
    setGuest({
      firstname: '',
      lastname: '',
      isChild: '',
      isVegetarian: '',
      presentBrunch: '',
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setErrorFirstname(false);
    setErrorLastname(false);
    setErrorChild(false);
    setErrorVegetarian(false);
    setErrorBrunch(false);
    setErrorText(null);
    setOpenForm(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'firstname' || e.target.name === 'lastname') {
      setGuest({...guest, [e.target.name]: e.target.value.trim()});
    } else setGuest({...guest, [e.target.name]: e.target.value});
  };

  const handleBlurFirstname = () => {
    if (guest.firstname.length <= 0) {
      setErrorFirstname(true);
    } else {
      setErrorFirstname(false);
    }
  };

  const handleBlurLastname = () => {
    if (guest.lastname.length <= 0) {
      setErrorLastname(true);
    } else {
      setErrorLastname(false);
    }
  };

  const handleBlurChild = () => {
    if (guest.isChild.length <= 0) {
      setErrorChild(true);
    } else {
      setErrorChild(false);
    }
  };

  const handleBlurVegetarian = () => {
    if (guest.isVegetarian.length <= 0) {
      setErrorVegetarian(true);
    } else {
      setErrorVegetarian(false);
    }
  };

  const handleBlurBrunch = () => {
    if (guest.presentBrunch.length <= 0) {
      setErrorBrunch(true);
    } else {
      setErrorBrunch(false);
    }
  };

  const handleModifyGuest = (i) => {
    setIndex(i);
    setGuest(allGuests[i]);
    setOpenForm(true);
  };

  const saveGuestInServer = async () => {
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/register/${state.user._id}`,
        guest
      );
      dispatch({type: 'UPDATE_GUESTS', payload: data.guests});
      dispatch({type: 'UPDATE_CARPOOLING', payload: data.isCarpooling});
      setAllGuests(data.guests);
    } catch ({response}) {
      setErrorSaveAllGuests(response.data);
    }
  };

  const saveGuests = (e) => {
    e.preventDefault();
    if (
      guest.firstname.length > 0 &&
      guest.lastname.length > 0 &&
      typeof guest.isChild === 'boolean' &&
      typeof guest.isVegetarian === 'boolean' &&
      typeof guest.presentBrunch === 'boolean'
    ) {
      saveGuestInServer();
      setGuest({
        firstname: '',
        lastname: '',
        isChild: '',
        isVegetarian: '',
        presentBrunch: '',
      });
      handleCloseForm();
    } else {
      setErrorText('Tous les champs sont requis');
    }
    setTimeout(() => {
      setErrorSaveAllGuests();
    }, 3000);
  };

  const handleChangeCarpooling = (e) => {
    setErrorCarpooling('');
    setModifyCarpooling(false);
    if (e.target.name === 'city') {
      setCarpooling({...carpooling, [e.target.name]: e.target.value.trim()});
    } else {
      setCarpooling({...carpooling, [e.target.name]: e.target.value});
    }
  };

  const handleSubmitCarpooling = async (e) => {
    e.preventDefault();
    setModifyCarpooling(true);
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}/carpooling`,
        carpooling
      );
      dispatch({type: 'UPDATE_CARPOOLING', payload: data.isCarpooling});
      setCarpooling(...data.isCarpooling);
      setErrorText('Modifications enregistrées.');
    } catch (err) {
      return err;
    }
    setTimeout(() => {
      setErrorText();
    }, 3000);
  };

  useEffect(async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}`
      );
      dispatch({type: 'UPDATE_GUESTS', payload: data.guests});
      dispatch({type: 'UPDATE_CARPOOLING', payload: data.isCarpooling});
      setAllGuests(data.guests);
      setCarpooling(...data.isCarpooling);
    } catch (err) {
      return err;
    }
  }, []);

  return (
    <div className={classes.container}>
      {showImgWeb && <img src={ImgWeb} className={classes.image_desktop} />}
      {!showImgPhone && !showImgWeb ? (
        <img src={ImgIpad} className={classes.image_ipad} />
      ) : null}
      {showImgPhone && <img src={ImgPhone} className={classes.image_phone} />}
      <div className={classes.containerPage}>
        <Typography variant="h2" className={classes.title}>
          Confirmer votre présence
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Pour confirmer votre présence, veuillez-vous enregistrer ainsi que chacun de vos
          accompagnants.
        </Typography>
        <div className={classes.addUser}>
          <AddCircle className={classes.iconAdd} onClick={handleOpenForm} />
          <div className={classes.containerUsers}>
            {allGuests &&
              allGuests.map((el, i) => (
                <div key={i}>
                  <SimpleCard
                    fistname={el.firstname}
                    lastname={el.lastname}
                    child={el.isChild ? 'Enfant' : 'Adulte'}
                    vegetarian={el.isVegetarian ? 'Repas végétarien' : 'Repas normal'}
                    brunch={el.presentBrunch ? 'Présent au brunch' : 'Absent au brunch'}
                    onClickModify={() => handleModifyGuest(i)}
                    deleteGuest={() => handleOpenDialog(i)}
                    registered={el.registered}
                  />
                </div>
              ))}
          </div>
        </div>
        <Container className={classes.containerCarpooling}>
          <CarpoolingForm
            modifyCarpooling={modifyCarpooling}
            carpooling={carpooling}
            handleChange={handleChangeCarpooling}
            handleSubmit={handleSubmitCarpooling}
            error={errorCarpooling}
          />
        </Container>
      </div>
      <SpringModal
        open={openForm}
        guest={guest}
        errorText={errorText}
        errorFirstname={errorFirstname}
        errorLastname={errorLastname}
        errorChild={errorChild}
        errorVegetarian={errorVegetarian}
        errorBrunch={errorBrunch}
        handleClose={handleCloseForm}
        handleChange={handleChange}
        handleBlurFirstname={handleBlurFirstname}
        handleBlurLastname={handleBlurLastname}
        handleBlurChild={handleBlurChild}
        handleBlurVegetarian={handleBlurVegetarian}
        handleBlurBrunch={handleBlurBrunch}
        handleChangeSubmit={saveGuests}
      />
      <ResponsiveDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        openDialogToDeleteGuest={deleteGuest}
        text={`Êtes-vous sûr de vouloir supprimer ${allGuests[index]?.firstname} ?`}
      />
      {errorText && <Notification text={errorText} type="success" />}
      {errorSaveAllGuests && <Notification text={errorSaveAllGuests} type="error" />}
    </div>
  );
};

export default ConfirmPresence;
