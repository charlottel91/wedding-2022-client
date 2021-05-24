import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, AddCircle } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button, ResponsiveDialog, SimpleCard, SpringModal } from '../Components';

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
        paddingBottom: '3rem'
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
        backgroundColor: 'orange'
    },
    icon: {
        // fontSize: 60,

    }
}));

export default function ConfirmPresence() {
    const classes = useStyles();
    const [user, setUser] = React.useState({
        firstname: '',
        lastname: '',
        child: '',
        vegetarian: '',
        brunch: ''
    });
    const [allUser, setAllUser] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [errorFirstname, setErrorFirstname] = React.useState(false);
    const [errorLastname, setErrorLastname] = React.useState(false);
    const [errorChild, setErrorChild] = React.useState(false);
    const [errorVegetarian, setErrorVegetarian] = React.useState(false);
    const [errorBrunch, setErrorBrunch] = React.useState(false);
    const [errorText, setErrorText] = React.useState(null)
    const [index, setIndex] = React.useState()

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIndex()
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
            setUser({ ...user, [e.target.name]: e.target.value.trim() })
        } else setUser({ ...user, [e.target.name]: e.target.value })
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
        setIndex(i)
        setUser({
            ...user,
            firstname: allUser[i].firstname,
            lastname: allUser[i].lastname,
            child: allUser[i].child,
            vegetarian: allUser[i].vegetarian,
            brunch: allUser[i].brunch,
        })
        setOpenForm(true);
    };

    const saveInAllUser = (e) => {
        e.preventDefault();
        if (user.firstname.length > 0
            && user.lastname.length > 0
            && typeof (user.child) === 'boolean'
            && typeof (user.vegetarian) === 'boolean'
            && typeof (user.brunch) === 'boolean') {
            if (index) {
                allUser.splice(index, 1, user)
            } else {
                setAllUser([...allUser, user]);
            }
            setUser({
                firstname: '',
                lastname: '',
                child: '',
                vegetarian: '',
                brunch: ''
            })
            handleCloseForm();
        } else {
            setErrorText('Tous les champs sont requis')
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.back}>
                <Link to="/">
                    <ArrowBack />
                </Link>
            </div>
            <Typography variant="h4" className={classes.title}>Confirmer votre présence</Typography>
            <div className={classes.containerUsers}>
                {allUser.map((user, i) => (
                    < SimpleCard
                        key={i}
                        title={user.firstname}
                        child={user.child ? 'Enfant' : 'Adulte'}
                        vegetarian={user.vegetarian ? 'Repas végétarien' : 'Repas normal'}
                        brunch={user.brunch ? 'Présent au brunch' : 'Absent au brunch'}
                        onClickModify={() => handleModifyUser(i)}
                        deleteUser={() => handleOpenDialog(i)}
                    />
                ))
                }
                <AddCircle className={classes.icon} onClick={handleOpenForm} />
            </div>
            <Box>
                <Button text='Enregistrer' />
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
                handleChangeSubmit={saveInAllUser} />
            <ResponsiveDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                deleteUser={deleteUser}
                text={`Êtes-vous sûr de vouloir supprimer ${allUser[index]?.firstname} ?`}
            />
        </div >
    );
}