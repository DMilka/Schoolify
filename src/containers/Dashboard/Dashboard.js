import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import classes from './Dashboard.css';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      delete: false,
    };
  }

  addModuleToggleHandler = () => {
    this.setState({
      ...this.state,
      open: !this.state.open,
    });
  };

  confirmDeleteHandler = () => {
    this.setState({
      ...this.state,
      delete: !this.state.delete,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Grid container justify="center" className={classes.Dashboard}>
          <Grid item xs={12} md={12} lg={1}>
            <Button variant="contained" color="primary" onClick={this.addModuleToggleHandler}>
              Dodaj moduł
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.Dashboard}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper elevation={5}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Moduł/Przedmiot</TableCell>
                    <TableCell align="center">Grupa/Klasa</TableCell>
                    <TableCell align="center">Data rozpoczęcia</TableCell>
                    <TableCell align="center">Data zakończenia</TableCell>
                    <TableCell align="center">Akcje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">
                        <IconButton variant="contained" color="primary">
                          <VisibilityRoundedIcon />
                        </IconButton>
                        <IconButton variant="contained" color="secondary" onClick={this.confirmDeleteHandler}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={this.state.open} TransitionComponent={Transition} keepMounted onClose={this.addModuleToggleHandler}>
          <DialogTitle>{'Dodaj nowy moduł'}</DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>

        <Dialog open={this.state.delete} TransitionComponent={Transition} keepMounted onClose={this.confirmDeleteHandler}>
          <DialogTitle id="alert-dialog-slide-title">{'Czy napewno usunąć'}</DialogTitle>
          <DialogActions>
            <Button onClick={this.confirmDeleteHandler} variant={'contained'} color="secondary">
              Tak
            </Button>
            <Button onClick={this.confirmDeleteHandler} variant={'contained'} color="primary">
              Nie
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Dashboard;