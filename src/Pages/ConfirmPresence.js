import React, {useState} from 'react';
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
} from '../Components';

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

export default function ConfirmPresence() {
  const classes = useStyles();
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    child: '',
    vegetarian: '',
    brunch: '',
    registered: null,
  });
  const [allUser, setAllUser] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorChild, setErrorChild] = useState(false);
  const [errorVegetarian, setErrorVegetarian] = useState(false);
  const [errorBrunch, setErrorBrunch] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [index, setIndex] = useState();
  const [errorSaveAllUsers, setErrorSaveAllUsers] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIndex();
  };

  const handleOpenDialog = (i) => {
    setIndex(i);
    setOpenDialog(true);
  };

  const deleteUser = () => {
    allUser.splice(index, 1);
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
      setUser({...user, [e.target.name]: e.target.value.trim()});
    } else setUser({...user, [e.target.name]: e.target.value});
  };

  const handleBlurFirstname = () => {
    if (user.firstname.length <= 0) {
      setErrorFirstname(true);
    } else {
      setErrorFirstname(false);
    }
  };

  const handleBlurLastname = () => {
    if (user.lastname.length <= 0) {
      setErrorLastname(true);
    } else {
      setErrorLastname(false);
    }
  };

  const handleBlurChild = () => {
    if (user.child.length <= 0) {
      setErrorChild(true);
    } else {
      setErrorChild(false);
    }
  };

  const handleBlurVegetarian = () => {
    if (user.child.length <= 0) {
      setErrorVegetarian(true);
    } else {
      setErrorVegetarian(false);
    }
  };

  const handleBlurBrunch = () => {
    if (user.child.length <= 0) {
      setErrorBrunch(true);
    } else {
      setErrorBrunch(false);
    }
  };

  const handleModifyUser = (i) => {
    setIndex(i);
    setUser({
      ...user,
      firstname: allUser[i].firstname,
      lastname: allUser[i].lastname,
      child: allUser[i].child,
      vegetarian: allUser[i].vegetarian,
      brunch: allUser[i].brunch,
      registered: allUser[i].registered,
    });
    setOpenForm(true);
  };

  const saveInArrayAllUser = (e) => {
    e.preventDefault();
    if (
      user.firstname.length > 0 &&
      user.lastname.length > 0 &&
      typeof user.child === 'boolean' &&
      typeof user.vegetarian === 'boolean' &&
      typeof user.brunch === 'boolean'
    ) {
      if (index) {
        allUser.splice(index, 1, user);
      } else {
        setAllUser([...allUser, user]);
      }
      setUser({
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

  const saveUserInServer = () => {
    allUser.forEach((user) => {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/registration`, user)
        .then((res) => {
          user.registered = true;
          console.log(res.body, 'res');
        })
        .catch((error) => {
          if (error.response.status === 409) {
            user.registered = false;
          } else setErrorSaveAllUsers(true);
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
        {allUser.map((user, i) => (
          <div key={i}>
            <SimpleCard
              title={user.firstname}
              child={user.child ? 'Enfant' : 'Adulte'}
              vegetarian={user.vegetarian ? 'Repas végétarien' : 'Repas normal'}
              brunch={user.brunch ? 'Présent au brunch' : 'Absent au brunch'}
              onClickModify={() => handleModifyUser(i)}
              deleteUser={() => handleOpenDialog(i)}
              registered={user.registered}
            />
            <Typography>
              {user.registered ? 'Enregistré.e' : 'Déjà enregitré.e'}
            </Typography>
          </div>
        ))}
        <AddCircle className={classes.icon} onClick={handleOpenForm} />
      </div>
      <Box>
        <Button text="Enregistrer" onClick={() => saveUserInServer()} />
      </Box>
      <SpringModal
        open={openForm}
        user={user}
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
        handleChangeSubmit={saveInArrayAllUser}
      />
      <ResponsiveDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        deleteUser={deleteUser}
        text={`Êtes-vous sûr de vouloir supprimer ${allUser[index]?.firstname} ?`}
      />
      {errorSaveAllUsers && (
        <Notification text="Une erreur s'est produite !" type="error" />
      )}
    </div>
  );
}
