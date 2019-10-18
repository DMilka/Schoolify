import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Home from './containers/home/Home';
import Layout from './Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        {/* <Route path="/marks" exact component={Marks} />
        <Route path="/attendance" exact component={Attendance} /> */}
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

export default App;
