import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class MarksTypeAddForm extends Component {
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
            Dodaj typ oceny
          </Button>
        </div>
      </form>
    );
  }
}

export default MarksTypeAddForm;
