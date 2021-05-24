import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Button } from './index'

export default function ResponsiveDialog({ open, deleteUser, handleClose, text }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary" text='Non' />
                    <Button onClick={deleteUser} color="primary" autoFocus text='Oui' />
                </DialogActions>
            </Dialog>
        </div>
    );
}