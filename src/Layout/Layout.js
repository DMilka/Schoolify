import React from 'react';
import classes from './Layout.css';
import MainNavigation from '../components/Navigation/MainNavigation/MainNavigation';
import ModuleNavigation from '../components/Navigation/ModuleNavigation/ModuleNavigation';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <MainNavigation isAuth={props.isAuth} />

      {props.children}
    </div>
  );
};

export default Layout;
