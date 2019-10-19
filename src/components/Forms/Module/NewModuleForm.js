import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import classes from './NewModuleForm.css';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class NewModuleForm extends Component {
  render() {
    return (
      <form autoComplete="off">
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12} md={10} lg={8}>
            <TextField
              fullWidth
              id="module-name-input"
              label="Nazwa modułu/przedmiotu"
              type="text"
              name="module_name"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <TextField fullWidth id="group-name-input" label="Nazwa klasy/grupy" type="text" name="group_name" variant="outlined" margin="normal" />
          </Grid>

          <Grid item xs={12} md={10} lg={8}>
            <RadioGroup aria-label="position" name="position" row>
              <Grid item xs={6} md={6} lg={6}>
                <div className={classes.Radio}>
                  <FormControlLabel value="weAvg" control={<Radio color="primary" />} label="Śr. ważona" labelPlacement="bottom" />
                </div>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <div className={classes.Radio}>
                  <FormControlLabel value="arAvg" control={<Radio color="primary" />} label="Śr. arytmetyczna" labelPlacement="bottom" />
                </div>
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.TimePicker}>
                <KeyboardDatePicker
                  className={classes.TimePicker}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Data pierwszych zajęć"
                  format="MM/dd/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={10} lg={8}>
            <div className={classes.Submit}>
              <Button color="primary" variant="contained">
                Stwórz moduł
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default NewModuleForm;
