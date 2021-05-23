import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, AddCircle } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button, SimpleCard, SpringModal } from '../Components';

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
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'orange'
    },
    card: {
        // padding: '1rem',
        // mawWidth: '40em',
        // heiht: '600px'
    },
    icon: {
        fontSize: 60
    }
}));

export default function ConfirmPresence() {
    const classes = useStyles();
    const [user, setUser] = React.useState({
        fisrtName: '',
        lastName: '',
        child: '',
        vegetarian: '',
        brunch: ''
    });
    const [allUser, setAllUser] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    console.log(user)
    console.log(allUser)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeFirstname = (event) => {
        setUser({ ...user, fisrtName: event.target.value });
    };

    const handleChangeLastname = (event) => {
        setUser({ ...user, lastName: event.target.value });
    };

    const handleChangeChild = (event) => {
        setUser({ ...user, child: event.target.value });
    };

    const handleChangeVegetarian = (event) => {
        setUser({ ...user, vegetarian: event.target.value });
    };

    const handleChangeBrunch = (event) => {
        setUser({ ...user, brunch: event.target.value });
    };

    const saveInAllUser = (e) => {
        e.preventDefault();
        setAllUser([...allUser, user]);
        setUser({
            fisrtName: '',
            lastName: '',
            child: '',
            vegetarian: '',
            brunch: ''
        })
        handleClose();
    }

    return (
        <div className={classes.container}>
            <div className={classes.back}>
                <Link to="/">
                    <ArrowBack />
                </Link>
            </div>
            <Typography variant="h3" className={classes.title}>Confirmer votre présence</Typography>
            <div className={classes.containerUsers}>
                {allUser.length === 0 ?
                    <Box className={classes.card}>
                        <SimpleCard
                            title="Personne 1"
                            child="Enfant ou adulte ?"
                            vegetarian="Repas végétarien ?"
                            brunch="Présent au brunch ?"
                            onClickOpen={handleOpen} />
                    </Box>
                    : (allUser.map(user =>
                        <Box className={classes.card}>
                            <SimpleCard
                                title={user.fisrtName}
                                child={user.child ? 'Enfant' : 'Adult'}
                                vegetarian={user.vegetarian ? 'Repas végétarien' : 'Repas normal'}
                                brunch={user.brunch ? 'Présent au brunch' : 'Absent au brunch'}
                                onClickOpen={handleOpen} />
                        </Box>
                    ))
                }
                <Box className={classes.card}>
                    <AddCircle className={classes.icon} onClick={handleOpen} />
                </Box>
            </div>
            <Box>
                <Button text='Enregistrer' />
            </Box>
            <SpringModal
                open={open}
                handleClose={handleClose}
                user
                handleChangeFirstname={handleChangeFirstname}
                handleChangeLastname={handleChangeLastname}
                handleChangeChild={handleChangeChild}
                handleChangeVegetarian={handleChangeVegetarian}
                handleChangeBrunch={handleChangeBrunch}
                handleChangeSubmit={saveInAllUser} />
        </div>
    );
}