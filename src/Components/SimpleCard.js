import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Button } from './index';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%'
        // maxWidth: 500,
        // flexBasis: 'calc(33.33333% - 0.83333rem)',
        // minHeight: '5rem',
        // margin: '0.625rem 0'

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard({ title, child, vegetarian, brunch, onClickOpen }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {child}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {vegetarian}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {brunch}
                </Typography>
            </CardContent>
            <CardActions>
                <Button text='Compléter' onClick={onClickOpen} />
            </CardActions>
        </Card>
    );
}