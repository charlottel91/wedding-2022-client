import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, AddCircle } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SimpleCard, SpringModal } from '../Components';

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
    },
    card: {
        margin: '1rem',
    }
}));

export default function ConfirmPresence() {
    const classes = useStyles();
    const [user, setUser] = React.useState({
        fisrtName: '',
        lastName: '',
        child: false,
        vegetarian: false,
        brunch: true
    });
    const [allUser, setAllUser] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    console.log(open)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                            onClickOpen={() => setOpen(true)} />
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
                <AddCircle className={classes.icon} />
            </div>
            <SpringModal
                open={open}
                handleClose={handleClose}
                user
                handleChangeChild={handleChangeChild}
                handleChangeVegetarian={handleChangeVegetarian}
                handleChangeBrunch={handleChangeBrunch} />
        </div>
    );
}