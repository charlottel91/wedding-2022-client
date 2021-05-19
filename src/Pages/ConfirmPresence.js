import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

const currencies = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 9,
        label: '9',
    },
    {
        value: 10,
        label: '10',
    },
];

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

    }
}));

export default function ConfirmPresence() {
    const classes = useStyles();
    const [adult, setAdult] = React.useState(0);
    const [child, setChild] = React.useState(0);

    const handleChangeAdult = (event) => {
        setAdult(event.target.value);
    };

    const handleChangeAChild = (event) => {
        setChild(event.target.value);
    };

    return (
        <div className={classes.container}>
            <div className={classes.back}>
                <i className="fas fa-arrow-left"></i>
                <Typography variant="h5">retour</Typography>
            </div>
            <Typography variant="h3" className={classes.title}>Confirmer votre présence</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Adulte"
                        value={adult}
                        onChange={handleChangeAdult}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Enfant (-10 ans)"
                        value={child}
                        onChange={handleChangeAChild}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
            </form>
        </div>
    );
}