import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import classes from './MainNavigation.css';
import ModuleNavigation from '../ModuleNavigation/ModuleNavigation';

class MainNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar position="relative" color="primary">
        <Toolbar className={classes.MainNavigation}>
          <Typography variant="h6">Schoolify</Typography>
          <div className={classes.btns}>
            {this.props.isAuth ? (
              <Button color="inherit" variant={'outlined'}>
                Wyloguj
              </Button>
            ) : (
              <Button color="inherit" variant={'outlined'}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MainNavigation;
