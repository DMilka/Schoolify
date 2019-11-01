import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox, TableBody } from '@material-ui/core';
import Table from '@material-ui/core/Table';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const items = [{ label: 'Śr. arytmetyczna', value: 'arAvg' }, { label: 'Śr. ważona', value: 'weightAvg' }];

class AttendanceCheckForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [{ id: 'name', name: 'name', type: 'text', label: 'Nazwa', style: { width: '100%' }, formcontrolprops: { style: { width: '100%' } } }],
      formValues: {},
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

  render() {
    const { students } = this.props;
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: '300px', minHeight: '200px' }}>
          <Grid container spacing={3}>
            {students.map((el) => {
              return (
                <Grid key={el.id} item xs={12} md={6} lg={6}>
                  <Grid container>
                    <Grid item xs={12} md={6} lg={6}>{`${el.name} ${el.surname}`}</Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Checkbox onChange={this.fieldChangeHandler} name={`${el.id}`} value={true} />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Button variant="contained" color="primary">
            Zakończ sprawdzanie
          </Button>
        </div>
      </form>
    );
  }
}

export default AttendanceCheckForm;
