import React, { Component } from 'react';
import DialogTemplate from '../../components/Dialog/DialogTemplate';
import Button from '@material-ui/core/Button';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDialogOpen: true,
    };
  }

  render() {
    return (
      <React.Fragment>
        <DialogTemplate open={this.state.loginDialogOpen} content={<AuthForm loginCheck={this.props.loginCheck} />} />
      </React.Fragment>
    );
  }
}

export default Home;
