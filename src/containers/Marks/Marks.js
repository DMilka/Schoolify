import React, { Component } from 'react';
import ModuleNavigation from '../../components/Navigation/ModuleNavigation/ModuleNavigation';
import JournalTable from '../../components/Journal/JournalTable/JournalTable';
import DialogTemplate from '../../components/Dialog/DialogTemplate';
import MarksJournalActions from '../../components/Journal/JournalActions/MarksJournalActions';
import Button from '@material-ui/core/Button';

class Marks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      content: 'mark',
    };
  }

  logFunc = () => {
    console.log(this.state);
  };

  createContent = (content) => {
    console.log(content);

    this.setState(
      {
        ...this.state,
        content: content,
      },
      this.openDialogHandler
    );
  };

  openDialogHandler = () => {
    this.setState({
      ...this.state,
      dialogOpen: true,
    });
  };

  closeDialogHandler = () => {
    this.setState({
      ...this.state,
      dialogOpen: false,
    });
  };

  render() {
    return (
      <div>
        <ModuleNavigation />
        <DialogTemplate
          open={this.state.dialogOpen}
          content={this.state.content}
          onClose={this.closeDialogHandler}
          actionButtons={
            <Button color="secondary" onClick={this.closeDialogHandler}>
              Zamknij
            </Button>
          }
        />
        <MarksJournalActions onClickHandler={this.createContent} />
        <JournalTable />
      </div>
    );
  }
}

export default Marks;
