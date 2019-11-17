import React, { Component } from "react";
import { formBuilder } from "../../../Helpers/FormBuilder/formBuilder";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { post } from "../../../Helpers/Auth/ApiCalls";
import {
  formErrorLabel,
  formErrorBigLabel,
  formSuccessBigLabel
} from "../../../Helpers/Styles/globalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

class MarksTypeAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    let additionalInput = null;

    if (props.avgType === "we_avg") {
      additionalInput = {
        id: "avgValue",
        name: "avgValue",
        type: "text",
        label: "Wartość wagi",
        style: { width: "100%" },
        formcontrolprops: { style: { width: "100%" } }
      };
    }

    this.state = {
      form: [
        {
          id: "name",
          name: "name",
          type: "text",
          label: "Nazwa",
          style: { width: "100%" },
          formcontrolprops: { style: { width: "100%" } }
        },
        additionalInput
      ],
      formValues: {},
      loading: false,
      errors: {},
      error: false,
      afterRegisterError: null,
      afterRegisterMsg: null,
      shouldCheck: false
    };
  }

  markTypeAdd = () => {
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () => {
        post(
          "http://localhost:8000/api/mark_forms",
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
          },
          {
            name: this.state.formValues.name,
            avgValue: parseFloat(this.state.formValues.avgValue),
            moduleId: `/api/modules/${localStorage.getItem("s_moduleId")}`
          },
          () => {
            this.setState({
              ...this.state,
              loading: false,
              afterRegisterMsg: "Dodano typ oceny",
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

  shouldCheckForm = (shouldCheck, form) => {
    if (shouldCheck) this.formChecker(form);
  };

  formChecker = form => {
    let errors = {};

    if (form.name !== undefined && form.name.length < 1) {
      errors = {
        ...errors,
        name: "Pole oceny nie może być puste"
      };
      this.state.form[0].error = true;
    } else {
      if (errors.hasOwnProperty("name")) errors.name = null;
      this.state.form[0].error = null;
    }

    this.setState(
      {
        ...this.state,
        errors: errors
      },
      () => console.log(this.state.errors)
    );
  };

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

  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: "300px", minHeight: "200px" }}>
          <Grid container spacing={3}>
            {formBuilder(this.state.form).map((el, indx) => {
              return (
                <Grid key={indx} item xs={12} md={12} lg={12}>
                  {el}
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.markTypeAdd}
          >
            Dodaj typ oceny
          </Button>
          <Grid container>
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

export default MarksTypeAddForm;
