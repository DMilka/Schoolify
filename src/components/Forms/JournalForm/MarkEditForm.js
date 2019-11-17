import React, { Component } from "react";
import { formBuilder } from "../../../Helpers/FormBuilder/formBuilder";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { put } from "../../../Helpers/Auth/ApiCalls";
import TextField from "@material-ui/core/TextField";
import {
  formErrorLabel,
  formErrorBigLabel,
  formSuccessBigLabel
} from "../../../Helpers/Styles/globalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

const namesItems = [
  { label: "Damian", value: 1 },
  { label: "Marek", value: 2 },
  { label: "Nina", value: 3 }
];
const typesItems = [
  { label: "Kartkówka", value: 1 },
  { label: "Sprawdzian", value: 2 },
  { label: "Odp. ustna", value: 3 }
];
class MarkEditForm extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      form: [
        {
          id: "mark",
          name: "mark",
          type: "text",
          label: "Ocena",
          style: { width: "100%" },
          formcontrolprops: { style: { width: "100%" } }
        }
      ],
      formValues: {
        value: props.mark.value ? props.mark.value : null,
        oldValue: props.mark.oldValue ? props.mark.oldValue : null
      },
      loading: false,
      errors: {},
      error: false,
      afterRegisterError: null,
      afterRegisterMsg: null,
      shouldCheck: false
    };
  }

  tmpFunc = () => {
    console.log(this.state);
  };

  fieldChangeHandler = e => {
    const value = e.target.value;
    this.setState(
      {
        ...this.state,
        formValues: {
          ...this.state.formValues,
          [e.target.name]: value
        }
      },
      this.tmpFunc
    );
  };

  markAdd = () => {
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () => {
        put(
          `http://localhost:8000${this.props.mark["@id"]}`,
          {
            value: parseFloat(this.state.formValues.value),
            oldValue: parseFloat(this.state.formValues.oldValue),
            studentId: `${this.props.mark.studentId}`,
            markformId: `${this.props.mark.markformId}`
          },
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
          },

          () => {
            this.setState({
              ...this.state,
              loading: false,
              afterRegisterMsg: "Edytowano ocenę",
              error: false
            });
          },
          () => {
            this.setState({
              ...this.state,
              error: true,
              afterRegisterError: true,
              loading: false,
              afterRegisterError: "Wystąpił nieoczekiwany błąd"
            });
          }
        );
      }
    );
  };

  render() {
    const { value, oldValue } = this.props.mark;
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: "300px", minHeight: "200px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                name={"value"}
                label="Ocena"
                margin="normal"
                value={this.state.formValues.value}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                name={"oldValue"}
                label="Stara ocena"
                margin="normal"
                value={this.state.formValues.oldValue}
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.markAdd}>
            Zmień ocene
          </Button>
          <Grid container spacing={3}>
            {this.state.loading ? (
              <Grid item xs={12} md={12} lg={12}>
                <CircularProgress color="secondary" />
              </Grid>
            ) : null}
            <Grid item xs={12} md={12} lg={12}>
              <span style={formErrorBigLabel}>
                {this.state.afterRegisterError}
              </span>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <span style={formSuccessBigLabel}>
                {this.state.afterRegisterMsg}
              </span>
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
}

export default MarkEditForm;
