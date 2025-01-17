import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const selectLoop = (items) => {
  let selectItems = [];
  items.map((item) => {
    selectItems.push(
      <MenuItem key={`${item.value}_${item.label}`} value={item.value}>
        {item.label}
      </MenuItem>
    );
  });
  return selectItems;
};

const selectInputType = (item) => {
  if(item !== null) {
  switch (item.type) {
    case 'email':
      return (
        <FormControl key={item.id} {...item.formcontrolprops}>
          <TextField {...item} />
        </FormControl>
      );
    case 'text':
      return (
        <FormControl key={item.id} {...item.formcontrolprops}>
          <TextField {...item} />
        </FormControl>
      );
    case 'password':
      return (
        <FormControl key={item.id} {...item.formcontrolprops}>
          <TextField {...item} />
        </FormControl>
      );
    case 'radio':
      return <FormControlLabel {...item.formcontrolprops} key={item.id} control={<Radio {...item} />} label={item.label} />;
    case 'checkbox':
      return <FormControlLabel {...item.formcontrolprops} key={item.id} control={<Checkbox {...item} />} label={item.label} />;
    case 'select':
      return (
        <Select key={item.id} {...item.formcontrolprops} value={item.value} {...item}>
          {selectLoop(item.items)}
        </Select>
      );
    default:
      return (
        <FormControl key={item.id} {...item.formcontrolprops}>
          <TextField {...item} />
        </FormControl>
      );
  }
}
};

export const formBuilder = (form) => {
  let componentsForm = [];
  form.forEach((el) => {
    componentsForm.push(selectInputType(el));
  });
  return componentsForm;
};
