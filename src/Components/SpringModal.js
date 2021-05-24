import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, MenuItem, Modal, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Button } from './index'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    textfield: {
        margin: 5,
    },
    textError: {
        color: 'red'
    }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const presence = [
    {
        value: true,
        label: 'OUI',
    },
    {
        value: false,
        label: 'NON',
    },
];

export default function SpringModal({
    user,
    open,
    errorText,
    errorFirstname,
    errorLastname,
    errorChild,
    errorVegetarian,
    errorBrunch,
    handleClose,
    handleChange,
    handleBlurFirstname,
    handleBlurLastname,
    handleBlurChild,
    handleBlurVegetarian,
    handleBlurBrunch,
    handleChangeSubmit }) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <FormControl className={classes.root} noValidate autoComplete="off">
                            <TextField
                                error={errorFirstname}
                                className={classes.textfield}
                                label="Prénom"
                                name="firstname"
                                value={user.firstname}
                                onBlur={handleBlurFirstname}
                                onChange={handleChange}
                                variant="outlined"
                                helperText={errorFirstname ? 'Champ requis' : null}
                            />
                            <TextField
                                error={!!errorLastname}
                                className={classes.textfield}
                                label="Nom"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                                onBlur={handleBlurLastname}
                                variant="outlined"
                                helperText={errorLastname ? 'Champ requis' : null}
                            />
                            <TextField
                                error={!!errorChild}
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Enfant (-10 ans)"
                                name='child'
                                defaultValue=''
                                value={user.child}
                                onChange={handleChange}
                                onBlur={handleBlurChild}
                                variant="outlined"
                                helperText={errorLastname ? 'Champ requis' : null}
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                error={!!errorVegetarian}
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Repas végétarien"
                                name='vegetarian'
                                defaultValue=''
                                value={user.vegetarian}
                                onChange={handleChange}
                                onBlur={handleBlurVegetarian}
                                variant="outlined"
                                helperText={errorLastname ? 'Champ requis' : null}
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                error={!!errorBrunch}
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Présence au brunch"
                                name='brunch'
                                defaultValue=''
                                value={user.brunch}
                                onChange={handleChange}
                                onBlur={handleBlurBrunch}
                                variant="outlined"
                                helperText={errorLastname ? 'Champ requis' : null}
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {errorText && <Typography className={classes.textError}>{errorText}</Typography>}
                            <Button text='Valider' onClick={handleChangeSubmit} />
                        </FormControl>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}