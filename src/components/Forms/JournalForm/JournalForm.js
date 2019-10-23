import React, { Component } from 'react';
import { formBuilder } from '../../../Helpers/FormBuilder/formBuilder';
import Grid from '@material-ui/core/Grid';

class JournalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: [
        { id: 'mark', type: 'text', label: 'Ocena' },
        { id: 'weight', type: 'text', label: 'Waga' },
        {
          id: 'namesList',
          type: 'select',
          value: 1,
          autoWidth: true,
          style: { width: '100%' },
          items: [{ label: 'Damian', value: 1 }, { label: 'Marek', value: 2 }, { label: 'Nina', value: 3 }],
        },
      ],
      formValues: {},
    };
  }
  render() {
    return (
      <form>
        {formBuilder(this.state.form).map((el, indx) => {
          return (
            <Grid key={indx} item xs={12} md={12} lg={12}>
              {el}
            </Grid>
          );
        })}
      </form>
    );
  }
}

export default JournalForm;
