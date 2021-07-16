import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';

import Button from './Button';

export default function ResponsiveDialog({
  open,
  openDialogToDeleteGuest,
  handleClose,
  text,
}) {
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
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" text="Non" />
          <Button
            onClick={openDialogToDeleteGuest}
            color="primary"
            autoFocus
            text="Oui"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}