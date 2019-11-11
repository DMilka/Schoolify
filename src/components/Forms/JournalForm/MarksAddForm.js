import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {post} from '../../../Helpers/Auth/ApiCalls';
const namesItems = [{ label: 'Damian', value: 1 }, { label: 'Marek', value: 2 }, { label: 'Nina', value: 3 }];
const typesItems = [{ label: 'Kartkówka', value: 1 }, { label: 'Sprawdzian', value: 2 }, { label: 'Odp. ustna', value: 3 }];
class MarksAddForm extends Component {
  constructor(props) {
    super(props);

    let marksInputs = null;


    this.state = {
      form: [
        { id: 'mark', name: 'mark', type: 'text', label: 'Ocena', style: { width: '100%' }, formcontrolprops: { style: { width: '100%' } } },
      ,
      ],
      formValues: {
        studentId: props.students[0].id,
        markFormId: props.markForms[0].id,
      },
    };
  }

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
            markformId: `/api/mark_forms/${this.state.formValues.markFormId}`
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
  }

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
              <Select fullWidth value={this.state.formValues.studentId} onChange={this.fieldChangeHandler} name={'studentId'}>
                {this.props.students.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name} {el.Surname}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Select fullWidth value={this.state.formValues.markFormId} onChange={this.fieldChangeHandler} name={'markFormId'}>
                {this.props.markForms.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </div>
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={this.markAdd}>
            Dodaj ocene
          </Button>
        </div>
      </form>
    );
  }
}

export default MarksAddForm;
