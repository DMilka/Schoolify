import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const selectInputType = (item) => {
  const formControlProps = {};

  switch (item.type) {
    case 'email':
      return (
        <FormControl key={item.id} {...formControlProps}>
          <TextField {...item} />
        </FormControl>
      );
    case 'text':
      return (
        <FormControl key={item.id} {...formControlProps}>
          <TextField {...item} />
        </FormControl>
      );
    case 'password':
      return (
        <FormControl key={item.id} {...formControlProps}>
          <TextField {...item} />
        </FormControl>
      );
    case 'radio':
      return <FormControlLabel {...formControlProps} key={item.id} control={<Radio {...item} />} label={item.label} />;
    case 'checkbox':
      return <FormControlLabel {...formControlProps} key={item.id} control={<Checkbox {...item} />} label={item.label} />;
    default:
      return (
        <FormControl key={item.id} {...formControlProps}>
          <TextField {...item} />
        </FormControl>
      );
  }
};

export const formBuilder = (form) => {
  let componentsForm = [];
  form.forEach((el) => {
    componentsForm.push(selectInputType(el));
  });
  return componentsForm;
};
