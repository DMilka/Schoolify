import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Home from './containers/home/Home';
import Layout from './Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Marks from './containers/Marks/Marks';
import Attendance from './containers/Attendance/Attendance';
import { get } from './Helpers/Auth/ApiCalls';

class App extends Component {
  state = {
    isAuth: false,
  };

  render() {
    let routes = (
      <Switch>
        {this.state.isAuth ? (
          <React.Fragment>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/marks" exact component={Marks} />
            <Route path="/attendance" exact component={Attendance} />
          </React.Fragment>
        ) : null}

        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout isAuth={this.state.isAuth}>{routes}</Layout>;
  }
}

export default App;
