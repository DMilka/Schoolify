import React, { Component } from 'react';
import DialogTemplate from '../../components/Dialog/DialogTemplate';
import Button from '@material-ui/core/Button';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

class Home extends Component {
  state = {
    loginDialogOpen: true,
  };

  render() {
    return (
      <React.Fragment>
        <DialogTemplate open={true} content={<AuthForm />} />
      </React.Fragment>
    );
  }
}

export default Home;
