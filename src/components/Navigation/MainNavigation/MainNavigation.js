import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import classes from './MainNavigation.css';

class MainNavigation extends Component {
  render() {
    return (
      <AppBar position="relative" color="primary">
        <Toolbar className={classes.MainNavigation}>
          <Typography variant="h6">Schoolify</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MainNavigation;
