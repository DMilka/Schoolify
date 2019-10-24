import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class MarksAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [
        {
          id: 'namesList',
          type: 'select',
          name: 'nameList',
          value: 1,
          onChange: this.fieldChangeHandler,
          style: { width: '100%' },
          items: [{ label: 'Damian', value: 1 }, { label: 'Marek', value: 2 }, { label: 'Nina', value: 3 }],
        },
        {
          id: 'markTypeList',
          name: 'markTypeList',
          type: 'select',
          value: 1,
          style: { width: '100%' },
          onChange: this.fieldChangeHandler,
          items: [{ label: 'Kartkówka', value: 1 }, { label: 'Sprawdzian', value: 2 }, { label: 'Odp. ustna', value: 3 }],
        },
        { id: 'mark', name: 'mark', type: 'text', label: 'Ocena', style: { width: '100%' }, formcontrolprops: { style: { width: '100%' } } },
        { id: 'weight', name: 'weight', type: 'text', label: 'Waga', style: { width: '100%' }, formcontrolprops: { style: { width: '100%' } } },
      ],
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
    return (
      <form autoComplete="off" onChange={this.fieldChangeHandler}>
        <div style={{ flexGrow: 1, minWidth: '300px', minHeight: '200px' }}>
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
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Button variant="contained" color="primary">
            Dodaj ocene
          </Button>
        </div>
      </form>
    );
  }
}

export default MarksAddForm;
