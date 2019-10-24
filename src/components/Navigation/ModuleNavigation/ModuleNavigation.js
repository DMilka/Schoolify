import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classes from './ModuleNavigation.css';

class ModuleNavigation extends Component {
  state = {
    activeRoute: 'marks',
  };

  render() {
    return (
      <AppBar position="relative" color="inherit" className={classes.nav}>
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="primary" variant="contained">
            <NavLink to="/marks" className={classes.link} activeClassName={classes.active}>
              Oceny
            </NavLink>
          </Button>
          <Button color="primary" variant="contained">
            <NavLink to="/attendance" className={classes.link} activeClassName={classes.active}>
              Lista obecności
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ModuleNavigation;
