import React, { Component } from 'react';
import JournalTable from './JournalTable/JournalTable';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import JournalForm from '../Forms/JournalForm/JournalForm';

class Journal extends Component {
  render() {
    return (
      <Box my={2}>
        <Paper elevation={3}>
          <JournalForm />
          <JournalTable />
        </Paper>
      </Box>
    );
  }
}

export default Journal;
