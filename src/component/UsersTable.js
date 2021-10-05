import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
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
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function UsersTable({users}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) =>
              user.guests.map((guest) => (
                <TableRow key={i}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell key={i}>{guest.firstname}</TableCell>
                  <TableCell key={i}>{guest.lastname}</TableCell>
                  <TableCell key={i}>{guest.isChild}</TableCell>
                  <TableCell key={i}>{guest.isVegetarian}</TableCell>
                  <TableCell key={i}>{guest.presentBrunch}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
