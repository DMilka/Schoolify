import React, { Component } from 'react';
import { formBuilder } from '../../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { get, post } from '../../../../Helpers/Auth/ApiCalls';
import { formErrorLabel, formErrorBigLabel, formSuccessBigLabel } from '../../../../Helpers/Styles/globalStyle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { baseApi } from '../../../../config/apiConfig';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [{ id: 'username', type: 'text', label: 'Login' }, { id: 'password', type: 'password', label: 'Password' }],
      formValues: {},
      errors: {},
      shouldCheck: false,
    };

    console.log(props);
  }

  shouldCheckForm = (shouldCheck, form) => {
    if (shouldCheck) this.formChecker(form);
  };

  formChecker = (form) => {
    let errors = {};

    if (form.username !== undefined && form.username.length < 1) {
      errors = {
        ...errors,
        username: 'Login nie może być pusty',
      };
      this.state.form[0].error = true;
    } else {
      if (errors.hasOwnProperty('lousernamegin')) errors.username = null;
      this.state.form[0].error = null;
    }

    if (form.password !== undefined && form.password.length < 1) {
      errors = {
        ...errors,
        password: 'Hasło nie może być puste',
      };
      this.state.form[1].error = true;
    } else {
      if (form.password !== undefined && errors.hasOwnProperty('password')) errors.password = null;
      this.state.form[1].error = null;
    }

    this.setState(
      {
        ...this.state,
        errors: errors,
      },
      () => console.log(this.state.errors)
    );
  };

  fieldChangeHandler = (e) => {
    const value = e.target.value;
    this.setState(
      {
        ...this.state,
        shouldCheck: true,
        formValues: {
          ...this.state.formValues,
          [e.target.id]: value,
        },
      },
      () => {
        this.shouldCheckForm(this.state.shouldCheck, this.state.formValues);
      }
    );
  };

  loginHandler = () => {
    this.setState(
      {
        ...this.state,
        loading: true,
      },
      () => {
        post(
          'http://localhost:8000/api/login_check',
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
          },
          {
            ...this.state.formValues,
          },
          (data) => {
            if (!data.data.token) {
              this.setState({
                ...this.state,
                loading: false,
                afterRegisterError: 'Błędny login lub hasło',
              });
            } else {
              localStorage.setItem('s_token', data.data.token);
              get(
                'http://localhost:8000/api/teachers',
                {
                  username: this.state.formValues.username,
                },
                null,
                (data) => {
                  localStorage.setItem('s_userid', data['hydra:member'][0].id);

                  this.setState(
                    {
                      ...this.state,
                      afterRegisterError: null,
                      loading: false,
                      afterRegisterMsg: null,
                    },
                    () => {
                      this.props.loginCheck();
                      this.props.history.push('/dashboard');
                    }
                  );
                },
                () => {
                  this.setState({
                    ...this.state,
                    afterRegisterError: 'Wystąpił nieoczekiwany problem',
                    loading: false,
                    afterRegisterMsg: null,
                  });
                }
              );
            }
          },
          () => {
            this.setState({
              ...this.state,
              afterRegisterError: 'Błędny login lub hasło',
              loading: false,
              afterRegisterMsg: null,
            });
          }
        );
      }
    );
  };

  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
          {formBuilder(this.state.form).map((el, indx) => {
            return (
              <Grid key={indx} item xs={12} md={12} lg={12}>
                {el}
                {this.state.errors[el.key] ? <span style={formErrorLabel}>{this.state.errors[el.key]}</span> : null}
              </Grid>
            );
          })}
          {Object.keys(this.state.formValues).length !== this.state.form.length ? (
            <Tooltip title="Wypełnij wszystkie pola w formularzu">
              <Button color="primary" onClick={() => {}} variant="contained">
                Login
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.loginHandler}
              disabled={
                !(Object.entries(this.state.errors).length === 0 && this.state.errors.constructor === Object) &&
                this.state.formValues.length !== this.state.form.length
              }
            >
              Login
            </Button>
          )}
          {this.state.loading ? (
            <Grid item xs={12} md={12} lg={12}>
              <CircularProgress color="secondary" />
            </Grid>
          ) : null}
          <Grid item xs={12} md={12} lg={12}>
            <span style={formErrorBigLabel}>{this.state.afterRegisterError}</span>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <span style={formSuccessBigLabel}>{this.state.afterRegisterMsg}</span>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withRouter(LoginForm);
