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
    margin: theme.spacing(1),
    minWidth: 120,
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
        <Typography>Je souhaite faire du covoiturage en tant que </Typography>
        <Select name="role" value={carpooling.role} onChange={handleChange}>
          <MenuItem value={'DRIVER'}>conducteur</MenuItem>
          <MenuItem value={'PASSENGER'}>passager</MenuItem>
        </Select>
        <Typography>au départ de </Typography>
        <TextField
          name="city"
          label="Ville"
          value={carpooling.city}
          onChange={handleChange}
        />
        <Typography>Nombre de places dont vous avez besoin ou de disponible :</Typography>
        <Select name="nb_seat" value={carpooling.nb_seat} onChange={handleChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        {error ? <Typography>{error}</Typography> : null}
        <Button
          disabled={modifyCarpooling}
          text={carpooling._id && !modifyCarpooling ? 'Modifier' : 'Valider'}
          onClick={handleSubmit}
        />
      </FormGroup>
    </Card>
  );
};

export default CarpoolingForm;
