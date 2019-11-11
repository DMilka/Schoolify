import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import classes from './NewModuleForm.css';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as moment from 'moment';
import { formErrorLabel, formErrorBigLabel, formSuccessBigLabel } from '../../../Helpers/Styles/globalStyle';
import { get, post } from '../../../Helpers/Auth/ApiCalls';

class NewModuleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [{ error: false }, { error: false }],
      formValues: {
        average_type: "1",
        start_date: moment().format('DD-MM-YYYY'),
      },
      loading: false,
      errors: {},
      afterRegisterError: null,
      afterRegisterMsg: null,
      shouldCheck: false,
    };
  }

  addModule = () => {
    this.setState(
      {
        ...this.state,
        loading: true,
      },
      () => {
        post(
          'http://localhost:8000/api/modules',
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
          },
          {
            name: this.state.formValues.module_name,
            className: this.state.formValues.group_name,
            startDate: this.state.formValues.start_date,
            teacherId: `api/teachers/${localStorage.getItem('s_userid')}`,
            averageTypeId: `/api/average_types/${this.state.formValues.average_type}`,
          },
          () => {
            this.setState({
              ...this.state,
              afterRegisterError: null,
              loading: false,
              afterRegisterMsg: 'Pomyślnie utworzono moduł',
            });
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
    );
  };

  logFunc = () => {
    console.log(this.state);
  };

  onChangeHandler = (e) => {
    this.setState(
      {
        ...this.state,
        shouldCheck: true,
        formValues: {
          ...this.state.formValues,
          [e.target.name]: e.target.value,
        },
      },
      () => {
        this.shouldCheckForm(this.state.shouldCheck, this.state.formValues);
        this.logFunc();
      }
    );
  };

  dateChangeHandler = (date) => {
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        start_date: moment(date).format('DD-MM-YYYY'),
      },
    });
  };

  shouldCheckForm = (shouldCheck, form) => {
    if (shouldCheck) this.formChecker(form);
  };

  formChecker = (form) => {
    let errors = {};

    if (form.module_name !== undefined && form.module_name.length < 3) {
      errors = {
        ...errors,
        module_name: 'Nazwa modułu powinna zawierać co najmniej 3 znaki',
      };
      this.state.form[0].error = true;
    } else {
      if (errors.hasOwnProperty('module_name')) errors.module_name = null;
      this.state.form[0].error = null;
    }

    if (form.group_name !== undefined && form.group_name.length < 2) {
      errors = {
        ...errors,
        group_name: 'Nazwa grupy powinna zawierać co najmniej 2 znaki',
      };
      this.state.form[1].error = true;
    } else {
      if (form.group_name !== undefined && errors.hasOwnProperty('group_name')) errors.group_name = null;
      this.state.form[1].error = null;
    }

    this.setState(
      {
        ...this.state,
        shouldCheck: true,
        errors: errors,
      },
      () => console.log(this.state.errors)
    );
  };

  render() {
    return (
      <form autoComplete="off">
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12} md={10} lg={8}>
            <TextField
              error={this.state.form[0].error}
              fullWidth
              id="module-name-input"
              label="Nazwa modułu/przedmiotu"
              type="text"
              name="module_name"
              variant="outlined"
              margin="normal"
              onChange={this.onChangeHandler}
            />
            {this.state.errors ? <span style={formErrorLabel}>{this.state.errors.module_name}</span> : null}
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <TextField
              error={this.state.form[1].error}
              fullWidth
              id="group-name-input"
              label="Nazwa klasy/grupy"
              type="text"
              name="group_name"
              variant="outlined"
              margin="normal"
              onChange={this.onChangeHandler}
            />
            {this.state.errors ? <span style={formErrorLabel}>{this.state.errors.group_name}</span> : null}
          </Grid>

          <Grid item xs={12} md={10} lg={8}>
            <RadioGroup aria-label="average_type" name="average_type" row onChange={this.onChangeHandler} value={this.state.formValues.average_type}>
              <Grid item xs={6} md={6} lg={6}>
                <div className={classes.Radio}>
                  <FormControlLabel value={"1"} control={<Radio color="primary" />} label="Śr. arytmetyczna" labelPlacement="bottom" />
                </div>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <div className={classes.Radio}>
                  <FormControlLabel value={"2"} control={<Radio color="primary" />} label="Śr. ważona" labelPlacement="bottom" />
                </div>
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.TimePicker}>
                <KeyboardDatePicker
                  name="start_date"
                  className={classes.TimePicker}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Data pierwszych zajęć"
                  format="MM/dd/yyyy"
                  onChange={this.dateChangeHandler}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </Grid>
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

          <Grid item xs={12} md={10} lg={8}>
            <div className={classes.Submit}>
              <Button color="primary" variant="contained" onClick={this.addModule}>
                Stwórz moduł
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default NewModuleForm;
