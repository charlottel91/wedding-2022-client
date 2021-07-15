import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ArrowBack, AddCircle} from '@material-ui/icons';
import {Typography} from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Notification, ResponsiveDialog, SimpleCard, SpringModal} from '../components';
import {AuthContext} from '../context';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '2rem',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  title: {
    paddingBottom: '3rem',
  },
  back: {
    position: 'fixed',
    color: 'black',
    display: 'flex',
  },
  containerUsers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'orange',
  },
  icon: {
    // fontSize: 60,
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

  const deleteGuest = () => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}/delete/guest`,
        guest
      )
      .then((res) => console.log(res))
      .catch((err) => err);
    handleCloseDialog();
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

  useEffect(async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${state.user._id}`
      );
      dispatch({type: 'UPDATE_GUESTS', payload: data.guests});
      setAllGuests(data.guests);
    } catch (err) {
      return err;
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.back}>
        <Link to="/">
          <ArrowBack />
        </Link>
      </div>
      <Typography variant="h4" className={classes.title}>
        Confirmer votre présence
      </Typography>
      <div className={classes.containerUsers}>
        {allGuests &&
          allGuests.map((el, i) => (
            <div key={i}>
              <SimpleCard
                title={el.firstname}
                child={el.isChild ? 'Enfant' : 'Adulte'}
                vegetarian={el.isVegetarian ? 'Repas végétarien' : 'Repas normal'}
                brunch={el.presentBrunch ? 'Présent au brunch' : 'Absent au brunch'}
                onClickModify={() => handleModifyGuest(i)}
                deleteGuest={() => handleOpenDialog(i)}
                registered={el.registered}
              />
            </div>
          ))}
        <AddCircle className={classes.icon} onClick={handleOpenForm} />
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
