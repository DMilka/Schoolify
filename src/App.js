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

  componentDidMount = () => {
    const headers = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzI2NDkxNjIsImV4cCI6MTU3MjY1Mjc2Miwicm9sZXMiOlsiSVNfQVVUSEVOVElDQVRFRF9GVUxMWSJdLCJ1c2VybmFtZSI6IlRlYWNoZXJMb2dpbjMifQ.LkUPDwetkWC8HRbdSfUqhyrnfUuxak3SeOyrZz73fimsQ_luex8N61x7FEDJ8Iiyvm6HjBSt4mne6Vu3UHNjWSzpb2XI0WEiqJCOi8cMTBijCf4Kk_08Z3fTNMIJjcD4D4zJhszreqtbrjtrq_yNBeGnrNx32cFJoxpP78ztyrpaw1hJlFSfbAFO7GcUZfbonexWlEqdShEJ14IuSuH9Bg6VmoT-ajJttt1wdtSDICUpEKaAGGhC74JFqtTyl9U9IrSZJqg6-KVcUqw1b8p3M6f1YnfMVRqAPJEkEcX5HEM_YlHhBaOt3QJ_A3HGlfnLtbdzWrkIy7M0U4K6YSvOVGh5MCTduV2992CTFkDQzJF_ZSnBzUD4DtJwjqsiubLcG991wVWgyg9UmAMjLmFq8EED1SxBHiJVT_qQSvou4Qt1N2PP_uxRxkyvXOwv37twbZIGX-OqWElr6M6c-6pck9hDYC6ar9O69mF0Ovnl55T4AfxM3BqzVl-znEGbwfTRDp9bP-zF0JXEt8EY6F_Ai0UfuKWTvk1KCiDcMqcQMd0Lo7Fk4za7_6rin8KLTmr1uX1x6juwyDblXfB1tDiRN6rCYUVbvnIbgXn6q8gXsGaZlRQt7e9MBdZLLK2kxgsG-BabjZQNvxKbZNPXrlFFDPEyiv6jCezouWV30N3YJKc',
    };

    get('http://localhost:8000/api/teachers', null, headers, (data) => {
      this.setState(
        {
          ...this.state,
          data: data,
        },
        () => console.log(data)
      );
    });
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

    let xd = this.state.data ? <div>Have data</div> : <div>No data</div>;
    return (
      <Layout isAuth={this.state.isAuth}>
        {routes}
        {xd}
      </Layout>
    );
  }
}

export default App;
