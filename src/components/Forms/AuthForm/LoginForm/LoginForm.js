import React, { Component } from 'react';
import { formBuilder } from '../../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [{ id: 'login', type: 'text', label: 'Login' }, { id: 'password', type: 'password', label: 'Password' }],
      formValues: {},
    };
  }

  tmpFunc = () => {
    console.log(this.state);
  };

  fieldChangeHandler = (e) => {
    const value = e.target.value;
    this.setState(
      {
        ...this.state,
        formValues: {
          ...this.state.formValues,
          [e.target.id]: value,
        },
      },
      this.tmpFunc
    );
  };
  loginHandler = () => {
    console.log('Login');
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
          {formBuilder(this.state.form).map((el, indx) => {
            return (
              <Grid key={indx} item xs={12} md={12} lg={12}>
                {el}
              </Grid>
            );
          })}
          <Grid item xs={12} md={12} lg={12}>
            <Button color="primary" onClick={this.loginHandler}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withRouter(LoginForm);
