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
class MarksAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [
        { id: "name", name: "name", type: "text", label: "Imię" },
        { id: "surname", name: "surname", type: "text", label: "Nazwisko" }
      ],
      formValues: {}
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        moduleId: `/api/modules/${localStorage.getItem("s_moduleId")}`
      }
    });
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

  addStudent = () => {
    post(
      "http://localhost:8000/api/students",
      {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
      },
      {
        ...this.state.formValues
      },
      () => {
        this.setState({
          ...this.state,
          afterRegisterError: null,
          loading: false,
          afterRegisterMsg: "Pomyślnie dodano studenta"
        });
      },
      () => {
        this.setState({
          ...this.state,
          afterRegisterError: "Wystąpił nieoczekiwany problem",
          loading: false,
          afterRegisterMsg: null
        });
      }
    );
  };

  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: "300px", minHeight: "200px" }}>
          <Grid container spacing={3}>
            {formBuilder(this.state.form).map((el, indx) => {
              return (
                <Grid key={indx} item xs={12} md={6} lg={6}>
                  {el}
                </Grid>
              );
            })}
          </Grid>
        </div>

        <Grid container>
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
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.addStudent}>
            Dodaj studenta
          </Button>
        </div>
      </form>
    );
  }
}

export default MarksAddForm;
