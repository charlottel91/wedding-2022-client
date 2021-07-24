import React from 'react';

import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CarpoolingForm = () => {
  const classes = useStyles();

  return (
    <Card>
      <FormControl className={classes.formControl}>
        <Typography>Je souhaite faire du covoiturage en tant que </Typography>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          // onChange={handleChange}
        >
          <MenuItem value={1}>conducteur</MenuItem>
          <MenuItem value={20}>passager</MenuItem>
        </Select>
        <Typography>au départ de </Typography>
        <TextField id="standard-basic" label="Ville" />
      </FormControl>
    </Card>
  );
};

export default CarpoolingForm;
