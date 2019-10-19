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
    const { open, onClose, title, content, actionButtons, ...rest } = this.props;
    return (
      <Dialog open={open} onClose={onClose} {...rest}>
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        {content ? <DialogContent>{content}</DialogContent> : null}
        {actionButtons ? <DialogActions>{actionButtons}</DialogActions> : null}
      </Dialog>
    );
  }
}

export default DialogTemplate;
