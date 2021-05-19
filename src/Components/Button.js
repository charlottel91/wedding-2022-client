import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

// const images = [
//     {
//         url: '/static/images/grid-list/breakfast.jpg',
//         title: 'Breakfast',
//         width: '40%',
//     },
//     {
//         url: '/static/images/grid-list/burgers.jpg',
//         title: 'Burgers',
//         width: '30%',
//     },
//     {
//         url: '/static/images/grid-list/camera.jpg',
//         title: 'Camera',
//         width: '30%',
//     },
// ];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
}));

export default function Button({ link, text }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to={link}>
                <ButtonBase
                    focusRipple
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                >
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                        {text}
                    </Typography>
                </ButtonBase>
            </Link>
        </div>
    );
}