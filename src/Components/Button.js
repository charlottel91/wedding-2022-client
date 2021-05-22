import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
}));

export default function Button({ link, text, onClickOpen }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to={link}>
                <ButtonBase
                    focusRipple
                    focusVisibleClassName={classes.focusVisible}
                    onClick={onClickOpen}
                >
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                    >
                        {text}
                    </Typography>
                </ButtonBase>
            </Link>
        </div>
    );
}