import React, { Component } from 'react';
import { formBuilder } from '../../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { get, post } from '../../../../Helpers/Auth/ApiCalls';
import { formErrorLabel } from '../../../../Helpers/Styles/globalStyle';
import Tooltip from '@material-ui/core/Tooltip';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [
        { id: 'login', type: 'text', label: 'Login' },
        { id: 'password', type: 'password', label: 'Password' },
        { id: 'password2', type: 'password', label: 'Re-type password' },
        { id: 'email', type: 'email', label: 'E-mail' },
        { id: 'name', type: 'text', label: 'Name' },
        { id: 'surname', type: 'text', label: 'Surname' },
        { id: 'rules', type: 'checkbox', label: 'Accept rules', value: 'true' },
      ],
      formValues: {},
      errors: {},
      shouldCheck: false,
    };
  }

  fieldChangeHandler = (e) => {
    if (e.target.id !== 'rules') {
      this.setState(
        {
          ...this.state,
          shouldCheck: true,
          formValues: {
            ...this.state.formValues,
            [e.target.id]: e.target.value,
          },
        },
        () => this.shouldCheckForm(this.state.shouldCheck, this.state.formValues)
      );
    }

    if (e.target.id === 'rules') {
      this.setState(
        {
          ...this.state,
          shouldCheck: true,
          formValues: {
            ...this.state.formValues,
            [e.target.id]: e.target.checked,
          },
        },
        () => this.shouldCheckForm(this.state.shouldCheck, this.state.formValues)
      );
    }
  };

  shouldCheckForm = (shouldCheck, form) => {
    if (shouldCheck) this.formChecker(form);
  };

  formChecker = (form) => {
    let errors = {};

    if (form.login !== undefined && form.login.length < 6) {
      errors = {
        ...errors,
        login: 'Login powinien być dłuższy niż 6 znaków',
      };
      this.state.form[0].error = true;
    } else {
      if (errors.hasOwnProperty('login')) errors.login = null;
      this.state.form[0].error = null;
    }

    if (form.password !== undefined && form.password.length < 6) {
      errors = {
        ...errors,
        password: 'Hasło powinno być dłuższe niż 6 znaków',
      };
      this.state.form[1].error = true;
    } else {
      if (form.password !== undefined && errors.hasOwnProperty('password')) errors.password = null;
      this.state.form[1].error = null;
    }

    if (form.password !== undefined && form.password2 !== undefined && form.password2 !== form.password) {
      errors = {
        ...errors,
        password2: 'Hasła się od siebie różnią',
      };
      this.state.form[2].error = true;
    } else {
      if (errors.hasOwnProperty('password2')) errors.password2 = null;
      this.state.form[2].error = null;
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (form.email !== undefined && !emailRegex.test(String(form.email).toLowerCase())) {
      errors = {
        ...errors,
        email: 'Email nie jest prawidłowy',
      };
      this.state.form[3].error = true;
    } else {
      if (errors.hasOwnProperty('email')) errors.email = null;
      this.state.form[3].error = null;
    }

    if (form.name !== undefined && form.name.length < 3) {
      errors = {
        ...errors,
        name: 'Imię nie może być puste',
      };
      this.state.form[4].error = true;
    } else {
      if (errors.hasOwnProperty('name')) errors.name = null;
      this.state.form[4].error = null;
    }

    if (form.surname !== undefined && form.surname.length < 3) {
      errors = {
        ...errors,
        surname: 'Nazwisko nie może być puste',
      };
      this.state.form[5].error = true;
    } else {
      if (errors.hasOwnProperty('surname')) errors.surname = null;
      this.state.form[5].error = null;
    }

    if (form.rules !== undefined && !form.rules) {
      errors = {
        ...errors,
        rules: 'Musisz zaakceptować regulamin',
      };
    } else {
      if (errors.hasOwnProperty('rules')) errors.rules = null;
    }

    this.setState(
      {
        ...this.state,
        errors: errors,
      },
      () => console.log(this.state.errors)
    );
  };

  registerHandler = () => {
    console.log('Register');
  };
  render() {
    return (
      <form autoComplete="off" onSubmit={this.props.onSubmitHandler} onChange={this.fieldChangeHandler}>
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
          {formBuilder(this.state.form).map((el, indx) => {
            return (
              <Grid key={indx} item xs={12} md={12} lg={12}>
                {el}
                {this.state.errors[el.key] ? <span style={formErrorLabel}>{this.state.errors[el.key]}</span> : null}
              </Grid>
            );
          })}

          <Grid item xs={12} md={12} lg={12}>
            {console.log(Object.keys(this.state.formValues).length, this.state.form.length)}
            {Object.keys(this.state.formValues).length !== this.state.form.length ? (
              <Tooltip title="Wypełnij wszystkie pola w formularzu">
                <Button variant="contained" color="primary" onClick={() => {}}>
                  Register
                </Button>
              </Tooltip>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerHandler}
                disabled={
                  !(Object.entries(this.state.errors).length === 0 && this.state.errors.constructor === Object) &&
                  this.state.formValues.length !== this.state.form.length
                }
              >
                Register
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default RegisterForm;
