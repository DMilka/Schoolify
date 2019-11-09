import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router';
import Home from './containers/home/Home';
import Layout from './Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Marks from './containers/Marks/Marks';
import Module from './containers/Module/Module';
import Attendance from './containers/Attendance/Attendance';
import { get } from './Helpers/Auth/ApiCalls';

class App extends Component {
  state = {
    isAuth: false,
  };

  componentDidMount = () => {
    if (localStorage.getItem('s_userid') && localStorage.getItem('s_token')) {
      this.props.history.push('/dashboard');
    }
  };

  checkLogin = () => {
    this.setState({
      ...this.state,
      isAuth: localStorage.getItem('s_token') !== null && localStorage.getItem('s_userid') !== null,
    });
  };
  render() {
    let routes = (
      <Switch>
        {localStorage.getItem('s_token') !== null && localStorage.getItem('s_userid') !== null ? (
          <React.Fragment>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/module" exact component={Module} />
            {/* <Route path="/marks" exact component={Marks} />
            <Route path="/attendance" exact component={Attendance} /> */}
          </React.Fragment>
        ) : null}

        <Route path="/" exact render={() => <Home loginCheck={this.checkLogin} />} />
        {this.state.isAuth ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
      </Switch>
    );

    return <Layout isAuth={localStorage.getItem('s_token') !== null && localStorage.getItem('s_userid') !== null}>{routes}</Layout>;
  }
}

export default withRouter(App);
