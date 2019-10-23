import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classes from './ModuleNavigation.css';

class ModuleNavigation extends Component {
  state = {
    activeRoute: 'marks',
  };

  moveToMarks = () => {
    this.setState({
      ...this.state,
      activeRoute: 'marks',
    });
    return <Redirect to="/marks" />;
  };
  moveToAttendance = () => {
    this.setState({
      ...this.state,
      activeRoute: 'attendance',
    });
    return <Redirect to="/attendance" />;
  };

  render() {
    return (
      <AppBar position="relative" color="inherit" className={classes.nav}>
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" onClick={this.moveToMarks}>
            Oceny
          </Button>

          <Button color="inherit" onClick={this.moveToAttendance}>
            Lista obecności
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ModuleNavigation;
