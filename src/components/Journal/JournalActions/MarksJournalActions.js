import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MarksAddForm from '../../Forms/JournalForm/MarksAddForm';
import MarksTypeAddForm from '../../Forms/JournalForm/MarksTypeAddForm';

class MarksJournalActions extends Component {
  constructor(props) {
    super(props);
  }

  createMarksContent = () => {
    this.props.onClickHandler(<MarksAddForm />);
  };

  createMarkTypeContent = () => {
    this.props.onClickHandler(<MarksTypeAddForm />);
  };

  render() {
    return (
      <div style={{ margin: '10px auto', textAlign: 'center', padding: '10px' }}>
        <Button color="primary" variant="contained" onClick={this.createMarksContent}>
          Dodaj ocenę
        </Button>
        <Button color="primary" variant="contained" onClick={this.createMarkTypeContent}>
          Dodaj typ oceny
        </Button>
      </div>
    );
  }
}

export default MarksJournalActions;
