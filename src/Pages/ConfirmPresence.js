import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ArrowBack, AddCircle} from '@material-ui/icons';
import {Box, Typography} from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
  Button,
  Notification,
  ResponsiveDialog,
  SimpleCard,
  SpringModal,
} from '../components';
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
  const {state} = useContext(AuthContext);
  const [guest, setGuest] = useState({
    firstname: '',
    lastname: '',
    child: '',
    vegetarian: '',
    brunch: '',
    registered: null,
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
  console.log(state.user._id);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIndex();
  };

  const handleOpenDialog = (i) => {
    setIndex(i);
    setOpenDialog(true);
  };

  const deleteGuest = () => {
    allGuests.splice(index, 1);
    handleCloseDialog();
  };

  const handleOpenForm = () => {
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
    if (guest.child.length <= 0) {
      setErrorChild(true);
    } else {
      setErrorChild(false);
    }
  };

  const handleBlurVegetarian = () => {
    if (guest.child.length <= 0) {
      setErrorVegetarian(true);
    } else {
      setErrorVegetarian(false);
    }
  };

  const handleBlurBrunch = () => {
    if (guest.child.length <= 0) {
      setErrorBrunch(true);
    } else {
      setErrorBrunch(false);
    }
  };

  const handleModifyGuest = (i) => {
    setIndex(i);
    setGuest({
      ...guest,
      firstname: allGuests[i].firstname,
      lastname: allGuests[i].lastname,
      child: allGuests[i].child,
      vegetarian: allGuests[i].vegetarian,
      brunch: allGuests[i].brunch,
      registered: allGuests[i].registered,
    });
    setOpenForm(true);
  };

  const saveInArrayAllGuests = (e) => {
    e.preventDefault();
    if (
      guest.firstname.length > 0 &&
      guest.lastname.length > 0 &&
      typeof guest.child === 'boolean' &&
      typeof guest.vegetarian === 'boolean' &&
      typeof guest.brunch === 'boolean'
    ) {
      if (index) {
        allGuests.splice(index, 1, guest);
      } else {
        setAllGuests([...allGuests, guest]);
      }
      setGuest({
        firstname: '',
        lastname: '',
        child: '',
        vegetarian: '',
        brunch: '',
        registered: null,
      });
      handleCloseForm();
    } else {
      setErrorText('Tous les champs sont requis');
    }
  };

  const saveGuestInServer = () => {
    allGuests.forEach((el) => {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/register/${
            state.user._id || localStorage.getItem('id')
          }`,
          el
        )
        .then((res) => {
          el.registered = true;
          console.log(res, 'res');
        })
        .catch((error) => {
          if (error.response.status === 409) {
            el.registered = false;
          } else setErrorSaveAllGuests(true);
        });
    });
  };

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
        {allGuests.map((el, i) => (
          <div key={i}>
            <SimpleCard
              title={el.firstname}
              child={el.child ? 'Enfant' : 'Adulte'}
              vegetarian={el.vegetarian ? 'Repas végétarien' : 'Repas normal'}
              brunch={el.brunch ? 'Présent au brunch' : 'Absent au brunch'}
              onClickModify={() => handleModifyGuest(i)}
              deleteGuest={() => handleOpenDialog(i)}
              registered={el.registered}
            />
            {el.registered === true && <Typography>Enregistré</Typography>}
            {el.registered === false && <Typography>Enregistré</Typography>}
          </div>
        ))}
        <AddCircle className={classes.icon} onClick={handleOpenForm} />
      </div>
      <Box>
        <Button text="Enregistrer" onClick={() => saveGuestInServer()} />
      </Box>
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
        handleChangeSubmit={saveInArrayAllGuests}
      />
      <ResponsiveDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        openDialogToDeleteGuest={deleteGuest}
        text={`Êtes-vous sûr de vouloir supprimer ${allGuests[index]?.firstname} ?`}
      />
      {errorSaveAllGuests && (
        <Notification text="Une erreur s'est produite !" type="error" />
      )}
    </div>
  );
};

export default ConfirmPresence;
