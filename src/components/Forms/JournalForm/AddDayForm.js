import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { post } from "../../../Helpers/Auth/ApiCalls";
import {
  formErrorLabel,
  formErrorBigLabel,
  formSuccessBigLabel
} from "../../../Helpers/Styles/globalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class AddDayForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualDate: moment().format(),
      error: null,
      loading: false,
      afterRegisterMsg: null
    };
  }

  handleDateChange = date => {
    this.setState(
      {
        ...this.actualDate,
        actualDate: date
      },
      () => console.log(this.state)
    );
  };

  addDate = () => {
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () => {
        post(
          "http://localhost:8000/api/attendance_forms",
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
          },
          {
            date: this.state.actualDate,
            moduleId: `/api/modules/${localStorage.getItem("s_moduleId")}`
          },
          () => {
            this.setState({
              ...this.state,
              loading: false,
              afterRegisterMsg: "Dodano zajęcia",
              error: false
            });
          },
          () => {
            this.setState({
              ...this.state,
              error: true,
              loading: false,
              afterRegisterMsg: "Wystąpił nieoczekiwany błąd"
            });
          }
        );
      }
    );
  };

  render() {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} lg={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Wybierz date zajęć"
              format="MM/dd/yyyy"
              value={this.state.actualDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Button color="primary" onClick={this.addDate} variant="contained">
            Dodaj zajęcia
          </Button>
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
      </Grid>
    );
  }
}
