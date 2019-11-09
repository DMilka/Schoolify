import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ModuleNavigation from '../../components/Navigation/ModuleNavigation/ModuleNavigation';
import JournalTable from '../../components/Journal/JournalTable/JournalTable';
import DialogTemplate from '../../components/Dialog/DialogTemplate';
import MarksJournalActions from '../../components/Journal/JournalActions/MarksJournalActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const typesItems = [{ label: 'Kartkówka', value: 1 }, { label: 'Sprawdzian', value: 2 }, { label: 'Odp. ustna', value: 3 }];

const students = [
  {
    id: 1,
    name: 'n1',
    surname: 's1',
    marks: [
      { name: 'm1', value: 5, oldValue: 3, markFormId: 2 },
      { name: 'm2', value: 2, oldValue: 2, markFormId: 1 },
      { name: 'm3', value: 4, oldValue: 1, markFormId: 3 },
    ],
  },
  {
    id: 2,
    name: 'n2',
    surname: 's2',
    marks: [{ name: 'm1', value: 5, oldValue: 3, markFormId: 3 }, { name: 'm3', value: 4, oldValue: 1, markFormId: 1 }],
  },
  {
    id: 3,
    name: 'n3',
    surname: 's3',
    marks: [
      { name: 'm1', value: 5, oldValue: 3, markFormId: 1 },
      { name: 'm2', value: 2, oldValue: 2, markFormId: 2 },
      { name: 'm3', value: 4, oldValue: 1, markFormId: 3 },
    ],
  },
];

const formTypes = [{ id: 1, name: 'Kartkówka' }, { id: 2, name: 'Odp. ustna' }, { id: 3, name: 'Sprawdzian' }];
class Marks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      content: 'mark',
    };

    console.log(props.students, props.markForms);
  }

  componentDidMount = () => {
    console.log('Marks');
  };

  logFunc = () => {
    console.log(this.state);
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

  createTableCell = (marks, marksTypes) => {
    const cells = [];
    let cell = null;

    marksTypes.forEach((markType) => {
      cell = null;
      marks.forEach((mark) => {
        if (markType.id === mark.markFormId) {
          cell = (
            <TableCell id={mark.id} key={mark.id} align="center">
              {mark.value}
            </TableCell>
          );
        }
      });

      if (cell === null) {
        cell = <TableCell key={markType.id} align="center"></TableCell>;
      }

      cells.push(cell);
    });

    return cells;
  };

  createHeaders = (items) => {
    const headers = [];
    if (items.length > 0) {
      items.map((el) => {
        headers.push(
          <TableCell key={el.id} id={el.id} align="center">
            {el.name}
          </TableCell>
        );
      });
    } else {
      return <TableCell align="center">Brak danych</TableCell>;
    }

    return headers;
  };

  createBody = (students, formTypes) => {
    let body = [];
    students.map((el) => {
      let cells = this.createTableCell(el.marks, formTypes);
      body.push(
        <TableRow>
          <TableCell key={el.id} id={el.id} align="center">{`${el.name} ${el.Surname}`}</TableCell>
          {cells}
        </TableRow>
      );
    });

    return body;
  };

  render() {
    return (
      <div>
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
        <JournalTable body={this.createBody(this.props.students, this.props.markForms)} headers={this.createHeaders(this.props.markForms)} />
      </div>
    );
  }
}

export default withRouter(Marks);
