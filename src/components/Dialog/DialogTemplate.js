import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

class DialogTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { open, title, content, actionButtons } = this.props;
    return (
      <Dialog open={open}>
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        {content}
        <DialogActions>{actionButtons}</DialogActions>
      </Dialog>
    );
  }
}

export default DialogTemplate;
