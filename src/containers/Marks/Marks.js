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


class Marks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      content: 'mark',
      avgType: props.location.state.module.averageTypeId.type
    };

    console.log(props.students, props.markForms);
    console.log(props.location.state.module.averageTypeId.type);
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
        console.log(el)
        headers.push(
          <TableCell key={el.id} id={el.id} align="center">
            {el.avgValue ? `${el.name} ( ${el.avgValue} )`  : el.name}
         
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
        <MarksJournalActions onClickHandler={this.createContent} avgType={this.state.avgType} students={this.props.students} markForms={this.props.markForms}/>
        <JournalTable body={this.createBody(this.props.students, this.props.markForms)} headers={this.createHeaders(this.props.markForms)} />
      </div>
    );
  }
}

export default withRouter(Marks);
