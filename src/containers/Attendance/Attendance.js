import React, { Component } from 'react';
import ModuleNavigation from '../../components/Navigation/ModuleNavigation/ModuleNavigation';
import JournalTable from '../../components/Journal/JournalTable/JournalTable';
import DialogTemplate from '../../components/Dialog/DialogTemplate';
import AttendanceJournalActions from '../../components/Journal/JournalActions/AttendanceJournalActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const students = [
  {
    id: 1,
    name: 'Sławomir',
    surname: 'Krzaczkowski-Konstantypolitan',
    attendance: [{ dateId: 1, present: true }, { dateId: 3, present: false }, { dateId: 2, present: false }],
  },
  {
    id: 2,
    name: 'Sławomir',
    surname: 'Krzaczkowski-Konstantypolitan',
    attendance: [{ dateId: 1, present: false }, { dateId: 2, present: false }, { dateId: 3, present: false }],
  },
  {
    id: 3,
    name: 'Sławomir',
    surname: 'Krzaczkowski-Konstantypolitan',
    attendance: [{ dateId: 3, present: true }, { dateId: 2, present: true }, { dateId: 1, present: true }],
  },
];

const dates = [{ id: 1, date: '2019-10-15' }, { id: 2, date: '2019-10-22' }, { id: 3, date: '2019-10-29' }];
class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      content: 'attendance',
    };
  }

  createTableCell = (attendance, dates) => {
    const cells = [];
    let cell = null;
    let inc = 0;

    dates.forEach((date) => {
      inc++;
      cell = null;
      attendance.forEach((attendance) => {
        if (date.id === attendance.dateId) {
          cell = (
            <TableCell id={attendance.id} key={attendance.id} align="center">
              <Checkbox checked={attendance.present} value={attendance.present} disabled />
            </TableCell>
          );
        }
      });

      if (cell === null) {
        cell = <TableCell key={date.id + '_' + inc} align="center"></TableCell>;
      }

      cells.push(cell);
    });

    return cells;
  };

  createHeaders = (items) => {
    const headers = [];
    items.map((el) => {
      headers.push(
        <TableCell key={el.id} id={el.id} align="center">
          {el.date}
        </TableCell>
      );
    });

    return headers;
  };

  createBody = (students, dates) => {
    let body = [];
    students.map((el) => {
      let cells = this.createTableCell(el.attendance, dates);
      body.push(
        <TableRow key={el.id}>
          <TableCell key={el.id} id={el.id} align="center">{`${el.name} ${el.surname}`}</TableCell>
          {cells}
        </TableRow>
      );
    });

    return body;
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

  createContent = (content) => {
    this.setState(
      {
        ...this.state,
        content: content,
      },
      this.openDialogHandler
    );
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
        <AttendanceJournalActions onClickHandler={this.createContent} param={students} />
        <JournalTable body={this.createBody(students, dates)} headers={this.createHeaders(dates)} />
      </div>
    );
  }
}

export default Attendance;
