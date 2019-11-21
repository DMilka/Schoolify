import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { post } from '../../../Helpers/Auth/ApiCalls';
import { formErrorLabel, formErrorBigLabel, formSuccessBigLabel } from '../../../Helpers/Styles/globalStyle';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class MarksAddForm extends Component {
  constructor(props) {
    super(props);

    let marksInputs = null;

    this.state = {
      form: [
        {
          id: 'mark',
          name: 'mark',
          type: 'text',
          label: 'Ocena',
          style: { width: '100%' },
          formcontrolprops: { style: { width: '100%' } },
        },
      ],
      formValues: {
        studentId: null,
        markFormId: null,
      },
      loading: false,
      errors: {},
      error: false,
      afterRegisterError: null,
      afterRegisterMsg: null,
      shouldCheck: false,
      filteredMarkForms: null,
      students: props.students,
      markForms: props.markForms,
    };

    console.log(this.state);
  }

  filterMarkForm = (students, markForms) => {
    if (students && markForms && this.state.formValues.studentId) {
      let activeStudent = null;
      students['hydra:member'].forEach((el) => {
        if (el.id === this.state.formValues.studentId) activeStudent = el;
      });

      let studentsMarkForms = [];
      activeStudent.marks.forEach((mark) => {
        studentsMarkForms.push(mark.markformId);
      });

      let intersection = markForms['hydra:member'].filter((x) => !studentsMarkForms.includes(x['@id']));

      let markFormFiltered = [];
      intersection.forEach((inter) => {
        markForms['hydra:member'].forEach((markform) => {
          console.log(inter, markform['@id']);
          if (markform['@id'].replace('"', '') === inter['@id'].replace('"', '')) markFormFiltered.push(markform);
        });
      });
      console.log(markFormFiltered);
      return markFormFiltered;
    } else {
      console.log(students, markForms, this.state.formValues.studentId);
      return [];
    }

    // return marksArr;
  };

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
          [e.target.name]: value,
        },
      },
      this.tmpFunc
    );
  };

  markAdd = () => {
    this.setState(
      {
        ...this.state,
        loading: true,
        afterRegisterMsg: null,
        afterRegisterError: null,
      },
      () => {
        post(
          'http://localhost:8000/api/marks',
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
          },
          {
            value: parseFloat(this.state.formValues.mark),
            studentId: `/api/students/${this.state.formValues.studentId}`,
            markformId: `/api/mark_forms/${this.state.formValues.markFormId}`,
          },
          () => {
            this.setState({
              ...this.state,
              loading: false,
              afterRegisterMsg: 'Dodano ocenę',
              error: false,
            });
          },
          () => {
            this.setState({
              ...this.state,
              error: true,
              afterRegisterError: true,
              loading: false,
              afterRegisterError: 'Wystąpił nieoczekiwany błąd',
            });
          }
        );
      }
    );
  };

  render() {
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: '300px', minHeight: '200px' }}>
          <Grid container spacing={3}>
            {formBuilder(this.state.form).map((el, indx) => {
              return (
                <Grid key={indx} item xs={12} md={12} lg={12}>
                  {el}
                </Grid>
              );
            })}
            <Grid item xs={12} md={12} lg={12}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select fullWidth value={this.state.formValues.studentId} onChange={this.fieldChangeHandler} name={'studentId'}>
                  {this.props.students &&
                    this.props.students['hydra:member'].map((el) => {
                      return (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name} {el.surname}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label">Forma sprawdzania</InputLabel>
                <Select fullWidth value={this.state.formValues.markFormId} onChange={this.fieldChangeHandler} name={'markFormId'}>
                  {this.state.markForms &&
                    this.state.students &&
                    this.state.formValues.studentId &&
                    this.filterMarkForm(this.state.students, this.state.markForms).map((el) => {
                      return (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{ margin: '15px auto', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={this.markAdd}>
            Dodaj ocene
          </Button>
          <Grid container justify="center" alignContent="center" alignItems="center">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {this.state.loading ? (
                <Grid item xs={12} md={12} lg={12}>
                  <CircularProgress color="secondary" />
                </Grid>
              ) : null}
              {this.state.afterRegisterError && (
                <Grid item xs={12} md={12} lg={12}>
                  <span style={formErrorBigLabel}>{this.state.afterRegisterError}</span>
                </Grid>
              )}
              {this.state.afterRegisterMsg && (
                <Grid item xs={12} md={12} lg={12}>
                  <span style={formSuccessBigLabel}>{this.state.afterRegisterMsg}</span>
                </Grid>
              )}
            </div>
          </Grid>
        </div>
      </form>
    );
  }
}

export default MarksAddForm;
