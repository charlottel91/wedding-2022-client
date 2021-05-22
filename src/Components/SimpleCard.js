import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from './index';

const useStyles = makeStyles({
    root: {
        // maxWidth: 500,
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
                <Button text='Compléter' onClickOpen={onClickOpen} />
            </CardActions>
        </Card>
    );
}