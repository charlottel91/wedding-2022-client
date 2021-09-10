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
        <Typography>
          Je souhaite faire du covoiturage en tant que{' '}
          <Select
            name="role"
            value={carpooling.role}
            onChange={handleChange}
            style={{margin: '1rem', width: '130px', textAlign: 'center'}}
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
            style={{
              marginBottom: '1rem',
              marginLeft: '1rem',
            }}
          />
          .
        </Typography>
        <Typography>
          Nombre de places dont vous avez besoin ou de disponible :{' '}
          <Select
            name="nb_seat"
            value={carpooling.nb_seat}
            onChange={handleChange}
            style={{margin: '1rem', width: '80px', textAlign: 'center'}}
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
