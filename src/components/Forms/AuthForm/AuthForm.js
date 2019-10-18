import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class AuthForm extends Component {
  state = {
    value: 0,
  };

  tabChangeHandler = () => {
    if (this.state.value === 0) {
      this.setState({
        ...this.state,
        value: 1,
      });
    } else {
      this.setState({
        ...this.state,
        value: 0,
      });
    }
  };

  loginHandler = (e) => {
    e.preveDefault();
    console.log('Login');
  };
  registerHandler = (e) => {
    e.preveDefault();
    console.log('Register');
  };

  render() {
    const { value } = this.state;

    return (
      <React.Fragment>
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={this.tabChangeHandler}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterForm />
        </TabPanel>
      </React.Fragment>
    );
  }
}

export default AuthForm;
