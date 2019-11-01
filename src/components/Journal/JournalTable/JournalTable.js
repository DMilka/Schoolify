import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

class JournalTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Paper>
        <React.Fragment>{this.props.journalActions}</React.Fragment>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Imię i nazwisko</TableCell>
              {this.props.headers}
            </TableRow>
          </TableHead>
          <TableBody>{this.props.body}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default JournalTable;
