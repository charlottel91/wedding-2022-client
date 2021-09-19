import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogContentText} from '@material-ui/core';

import Button from './Button';

export default function ResponsiveDialog({
  open,
  openDialogToDeleteGuest,
  handleClose,
  text,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
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
