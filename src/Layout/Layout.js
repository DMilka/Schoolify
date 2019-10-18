import React from 'react';
import classes from './Layout.css';
import MainNavigation from '../components/Navigation/MainNavigation/MainNavigation';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <MainNavigation isAuth={true} />

      {props.children}
    </div>
  );
};

export default Layout;
