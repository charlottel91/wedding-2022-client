import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const columns = [
  {id: 'name', label: 'Id'},
  {id: 'fistname', label: 'Prénom'},
  {id: 'lastname', label: 'Nom'},
  {id: 'isChild', label: 'Enfant'},
  {id: 'isVegetarian', label: 'Repas\u00a0végétarien'},
  {id: 'presentBrunch', label: 'Présence\u00a0brunch'},
];

const useStyles = makeStyles({
  root: {
    width: '90%',
    maxHeight: '100%',
    overflowY: 'auto',
    margin: 'auto',
  },
  container: {
    maxHeight: '60vh',
  },
});

export default function UsersTable({users}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{backgroundColor: 'black'}}>
              {columns.map((column, i) => (
                <TableCell key={i} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname ? user.firstname : ''}</TableCell>
                <TableCell>{user.lastname ? user.lastname : ''}</TableCell>
                <TableCell>
                  {user.isChild ? 'oui' : user.isChild === false ? 'non' : ''}
                </TableCell>
                <TableCell>
                  {user.isVegetarian ? 'oui' : user.isVegetarian === false ? 'non' : ''}
                </TableCell>
                <TableCell>
                  {' '}
                  {user.presentBrunch ? 'oui' : user.presentBrunch === false ? 'non' : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
