import React, {  Component } from 'react';
import {Redirect} from 'react-router-dom'
import Marks from '../Marks/Marks';
import Attendance from '../Attendance/Attendance';
import Dasboard from '../Dashboard/Dashboard';
import Button from '@material-ui/core/Button';
import { get } from '../../Helpers/Auth/ApiCalls';
class Module extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModule: 'marks',
      data: null,
    };
  }

  componentDidMount = () => {
    console.log('Markssssss');
    //  get = (url, paramsObj, headersObj, callback, callbackError);
    const moduleId = localStorage.getItem('s_moduleId');

    if (!moduleId) {
      this.setState({
        ...this.state,
        errorMsg: 'Wystąpił nieoczekiwany błąd.',
        loading: false,
      });
    } else {
      get(
        'http://localhost:8000/api/modules/' + moduleId,
        null,
        null,
        (data) => {
          console.log(data);
          this.setState({
            ...this.state,
            errorMsg: null,
            loading: false,
            data: data,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            ...this.state,
            errorMsg: 'Wystąpił nieoczekiwany błąd.',
            loading: false,
          });
        }
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={'contained'}
            color={'secondary'}
            style={{ margin: ' 10px' }}
            onClick={() => this.setState({ ...this.state, activeModule: 'dashboard' })}
          >
            Panel główny
          </Button>
          <Button
            variant={'contained'}
            color={'secondary'}
            style={{ margin: ' 10px' }}
            onClick={() => this.setState({ ...this.state, activeModule: 'marks' })}
          >
            Oceny
          </Button>
          <Button
            variant={'contained'}
            color={'secondary'}
            style={{ margin: ' 10px' }}
            onClick={() => this.setState({ ...this.state, activeModule: 'attendance' })}
          >
            Obecność
          </Button>
        </div>
        {this.state.activeModule === 'dashboard' && this.state.data !== null ? (
           <Redirect to="/dashboard" />
        ) : null}
        {this.state.activeModule === 'marks' && this.state.data !== null ? (
          <Marks students={this.state.data.students} markForms={this.state.data.markForms} />
        ) : null}
        {this.state.activeModule === 'attendance' && this.state.data !== null ? (
          <Attendance students={this.state.data.students} attendanceForm={this.state.data.attendanceForm} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Module;
