import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Header } from '../Components';

const useStyles = makeStyles({
    toolbar: {
        background: 'linear-gradient(45deg, #EFF9ED 10%, #1a6c09 60%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    section: {
        paddingRight: '2rem',
        fontSize: '1.5em',
    },
    container: {
        border: 'solid 2px black',
        width: '100%',
        padding: 50
    }
});

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function Home(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.section} variant="h6">Programme</Typography>
                        <Typography className={classes.section} variant="h6">Confirmer ma venue</Typography>
                        <Typography className={classes.section} variant="h6">Se loger</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container className={classes.container}>
                <Header />
            </Container>
            <Container className={classes.container}>
                Programme bsjhkvvdklcn:ejbchjvekdh,bcevgrvfckaebfcnjaksgdjcvj sjdb
            </Container>
            <div className={classes.container}>
                <Button link="/confirmation" text='Confirmer ma présence' />
            </div>
            <div className={classes.container}>
                <Button text='Se loger' />
            </div>
        </React.Fragment>
    );
}