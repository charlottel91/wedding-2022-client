import React from 'react';

import {
  Card,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Button from './Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    maxWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    ['@media (min-width:780px)']: {
      margin: '1rem',
      width: '130px',
      textAlign: 'center',
    },
    ['@media (max-width:780px)']: {
      margin: '1rem',
      width: '110px',
      height: '20px',
    },
  },
  selectSeat: {
    margin: '0 1rem 1rem 0',
    width: '40px',
    // textAlign: 'center',
    ['@media (min-width:780px)']: {
      width: '80px',
    },
  },
  textFieldCity: {
    ['@media (min-width:780px)']: {
      marginBottom: '1rem',
      marginLeft: '1rem',
    },
    ['@media (max-width:780px)']: {
      width: '110px',
      marginBottom: '1rem',
    },
  },
}));

const CarpoolingForm = ({
  carpooling,
  error,
  handleChange,
  handleSubmit,
  modifyCarpooling,
}) => {
  const classes = useStyles();

  return (
    <Card>
      <FormGroup className={classes.formControl} noValidate autoComplete="off">
        <Typography variant="body2">
          Je souhaite faire du covoiturage en tant que{' '}
          <Select
            name="role"
            value={carpooling.role}
            onChange={handleChange}
            className={classes.select}
          >
            <MenuItem value={'--'}>--</MenuItem>
            <MenuItem value={'DRIVER'}>conducteur</MenuItem>
            <MenuItem value={'PASSENGER'}>passager</MenuItem>
          </Select>{' '}
          au départ de{' '}
          <TextField
            name="city"
            label="Ville"
            value={carpooling.city}
            onChange={handleChange}
            inputProps={{
              min: 0,
              style: {
                width: '120px',
                textAlign: 'center',
              },
            }}
            className={classes.textFieldCity}
          />
          .
        </Typography>
        <Typography variant="body2">
          Nombre de places dont vous avez besoin ou de disponible :{' '}
          <Select
            name="nb_seat"
            value={carpooling.nb_seat}
            onChange={handleChange}
            className={classes.selectSeat}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </Typography>
        {error ? <Typography>{error}</Typography> : null}
        <Button disabled={modifyCarpooling} text="Valider" onClick={handleSubmit} />
      </FormGroup>
    </Card>
  );
};

export default CarpoolingForm;
