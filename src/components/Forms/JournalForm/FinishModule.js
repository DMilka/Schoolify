import React, { Component } from "react";
import { formBuilder } from "../../../Helpers/FormBuilder/formBuilder";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { put, get } from "../../../Helpers/Auth/ApiCalls";
import TextField from "@material-ui/core/TextField";
import {
  formErrorLabel,
  formErrorBigLabel,
  formSuccessBigLabel
} from "../../../Helpers/Styles/globalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

class FinishModule extends Component {
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
      loadingStudents: false,
      loadingAttendacesForms: false,
      errors: {},
      error: false,
      afterRegisterError: null,
      afterRegisterMsg: null,
      shouldCheck: false,

      students: null,
      attendanceForms: null
    };
  }

  init = () => {
    this.setState(
      {
        ...this.state,
        loadingStudents: true,
        loadingAttendacesForms: true
      },
      () => {
        get(
          "http://localhost:8000/api/students?moduleId=" +
            localStorage.getItem("s_moduleId"),
          null,
          null,
          data => {
            this.setState({
              ...this.state,
              students: data,
              loadingStudents: false
            });
          },
          error => {
            console.log(error);
            this.setState({
              ...this.state,
              errorMsg: "Wystąpił nieoczekiwany błąd.",
              loadingStudents: false
            });
          }
        );

        get(
          "http://localhost:8000/api/attendance_forms?moduleId=" +
            localStorage.getItem("s_moduleId"),
          null,
          null,
          data => {
            this.setState({
              ...this.state,
              atttendanceForms: data,
              loadingAttendacesForms: false
            });
          },
          error => {
            console.log(error);
            this.setState({
              ...this.state,
              errorMsg: "Wystąpił nieoczekiwany błąd.",
              loadingAttendacesForms: false
            });
          }
        );
      }
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
    return <div></div>;
  }
}

export default FinishModule;
