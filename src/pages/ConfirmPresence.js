import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import {AddCircle} from '@material-ui/icons';
import {Typography} from '@material-ui/core';

import Notification from '../component/Notification';
import ResponsiveDialog from '../component/ResponsiveDialog';
import SimpleCard from '../component/SimpleCard';
import SpringModal from '../component/SpringModal';
import CarpoolingForm from '../component/CarpoolingForm';
import picture from '../assets/home_web.jpg';

const useStyles = makeStyles(() => ({
  containerPage: {
    width: '100%',
    minHeight: '100vh',
    backgroundImage: `url(${picture})`,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '2em',
  },
  title: {
    paddingTop: '1.5em',
    color: '#F2F2F2',
    fontWeight: 'bold',
  },
  containerUsers: {
    marginBottom: '1em',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0, 0.6)',
  },
  iconAdd: {
    width: 60,
    height: 60,
  },
}));

const ConfirmPresence = () => {
  const classes = useStyles();
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
    if (carpooling.role.length > 0 && carpooling.city.length > 0 && carpooling.seat > 0) {
      try {
        const {data} = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}/carpooling`,
          carpooling
        );
        dispatch({type: 'UPDATE_CARPOOLING', payload: data.isCarpooling});
        setCarpooling(...data.isCarpooling);
      } catch (err) {
        return err;
      }
    } else setErrorCarpooling('Tous les champs sont requis.');
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
    <div className={classes.containerPage}>
      <Typography variant="h4" className={classes.title}>
        Confirmer votre présence
      </Typography>
      <div className={classes.container}>
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
          <AddCircle className={classes.iconAdd} onClick={handleOpenForm} />
        </div>
        <CarpoolingForm
          modifyCarpooling={modifyCarpooling}
          carpooling={carpooling}
          handleChange={handleChangeCarpooling}
          handleSubmit={handleSubmitCarpooling}
          error={errorCarpooling}
        />
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
      {errorSaveAllGuests && <Notification text={errorSaveAllGuests} type="error" />}
    </div>
  );
};

export default ConfirmPresence;
