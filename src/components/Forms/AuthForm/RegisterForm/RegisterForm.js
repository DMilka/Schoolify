import React, { Component } from 'react';
import { formBuilder } from '../../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    };
  }

  tmpFunc = () => {
    if (this.state.formValues.password === this.state.formValues.password2) console.log('same!');
    console.log(this.state);
  };

  fieldChangeHandler = (e) => {
    this.setState(
      {
        ...this.state,
        formValues: {
          ...this.state.formValues,
          [e.target.id]: e.target.value,
        },
      },
      this.tmpFunc
    );
  };

  registerHandler = () => {
    console.log('Register');
  };
  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler} onSubmit={this.props.onSubmitHandler}>
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
          {formBuilder(this.state.form).map((el, indx) => {
            return (
              <Grid key={indx} item xs={12} md={12} lg={12}>
                {el}
              </Grid>
            );
          })}
          <Grid item xs={12} md={12} lg={12}>
            <Button color="primary" onClick={this.registerHandler}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default RegisterForm;
