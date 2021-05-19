import { Typography } from '@material-ui/core';
import React from 'react';
import { Countdown } from '.';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        padding: '2em'
    },
    typography: {
        fontSize: '3em'
    },
});

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography className={classes.typography}>Nous nous marions dans...</Typography>
            <Countdown />
        </div>
    )
}