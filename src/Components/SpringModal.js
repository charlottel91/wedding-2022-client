import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, MenuItem, Modal, TextField } from '@material-ui/core';
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

export default function SpringModal({ user,
    open,
    handleClose,
    handleChangeFirstname,
    handleChangeLastname,
    handleChangeChild,
    handleChangeVegetarian,
    handleChangeBrunch,
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
                                className={classes.textfield}
                                // id="outlined-password-input"
                                label="Prénom"
                                type="firstname"
                                value={user.firstname}
                                onChange={handleChangeFirstname}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.textfield}
                                // id="outlined-password-input"
                                label="Nom"
                                type="lastname"
                                value={user.lastname}
                                onChange={handleChangeLastname}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Enfant (-10 ans)"
                                defaultValue=''
                                value={user.child}
                                onChange={handleChangeChild}
                                variant="outlined"
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Repas végétarien"
                                defaultValue=''
                                value={user.vegetarian}
                                onChange={handleChangeVegetarian}
                                variant="outlined"
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                className={classes.textfield}
                                id="outlined-select-currency"
                                select
                                label="Présence au brunch"
                                defaultValue=''
                                value={user.brunch}
                                onChange={handleChangeBrunch}
                                variant="outlined"
                            >
                                {presence.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button text='Valider' onClick={handleChangeSubmit} />
                        </FormControl>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}