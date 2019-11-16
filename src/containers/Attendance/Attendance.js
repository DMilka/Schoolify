import React, { Component } from "react";
import ModuleNavigation from "../../components/Navigation/ModuleNavigation/ModuleNavigation";
import JournalTable from "../../components/Journal/JournalTable/JournalTable";
import DialogTemplate from "../../components/Dialog/DialogTemplate";
import AttendanceJournalActions from "../../components/Journal/JournalActions/AttendanceJournalActions";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { get } from "../../Helpers/Auth/ApiCalls";
import moment from "moment";

const students = [
  {
    id: 1,
    name: "Sławomir",
    surname: "Krzaczkowski-Konstantypolitan",
    attendance: [
      { dateId: 1, present: true },
      { dateId: 3, present: false },
      { dateId: 2, present: false }
    ]
  },
  {
    id: 2,
    name: "Sławomir",
    surname: "Krzaczkowski-Konstantypolitan",
    attendance: [
      { dateId: 1, present: false },
      { dateId: 2, present: false },
      { dateId: 3, present: false }
    ]
  },
  {
    id: 3,
    name: "Sławomir",
    surname: "Krzaczkowski-Konstantypolitan",
    attendance: [
      { dateId: 3, present: true },
      { dateId: 2, present: true },
      { dateId: 1, present: true }
    ]
  }
];

const dates = [
  { id: 1, date: "2019-10-15" },
  { id: 2, date: "2019-10-22" },
  { id: 3, date: "2019-10-29" }
];
class Attendance extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      dialogOpen: false,
      content: "attendance",
      attendanceForms: null,
      loading: true,
      errorMsg: null
    };
  }

  componentDidMount = () => {
    get(
      "http://localhost:8000/api/students?moduleId=" +
        localStorage.getItem("s_moduleId"),
      null,
      null,
      data => {
        get(
          "http://localhost:8000/api/attendance_forms?moduleId=" +
            localStorage.getItem("s_moduleId"),
          null,
          null,
          data2 => {
            this.setState(
              {
                ...this.state,
                errorMsg: null,
                loading: false,
                attendanceForms: data2,
                students: data
              },
              () => console.log(this.state)
            );
          },
          error => {
            console.log(error);
            this.setState({
              ...this.state,
              errorMsg: "Wystąpił nieoczekiwany błąd.",
              loading: false
            });
          }
        );
      }
    );
  };

  createTableCell = (attendance, dates) => {
    const cells = [];
    let cell = null;
    let inc = 0;
    console.log(attendance, dates);
    dates &&
      dates["hydra:member"].forEach(date => {
        inc++;
        cell = null;
        attendance.forEach(attendance => {
          console.log(date["@id"], attendance.attendanceFormId);
          if (date["@id"] === attendance.attendanceFormId) {
            cell = (
              <TableCell
                id={attendance.id}
                key={attendance.attendanceFormId}
                align="center"
              >
                <Checkbox
                  checked={attendance.value}
                  value={attendance.value}
                  disabled
                />
              </TableCell>
            );
          } else {
            cell = (
              <TableCell
                id={attendance.id}
                key={attendance.attendanceFormId}
                align="center"
              >
                <Checkbox checked={false} value={false} disabled />
              </TableCell>
            );
          }
        });

        if (cell === null) {
          cell = (
            <TableCell key={date.id + "_" + inc} align="center">
              <Checkbox checked={false} value={false} disabled />
            </TableCell>
          );
        }

        cells.push(cell);
      });

    return cells;
  };

  createHeaders = items => {
    const headers = [];
    items &&
      items["hydra:member"].map(el => {
        headers.push(
          <TableCell key={el.id} id={el.id} align="center">
            {moment(el.date).format("DD-MM-YYYY")}
          </TableCell>
        );
      });

    return headers;
  };

  createBody = (students, dates) => {
    let body = [];
    students &&
      students["hydra:member"].map(el => {
        let cells = this.createTableCell(el.attendances, dates);
        body.push(
          <TableRow key={el.id}>
            <TableCell
              key={el.id}
              id={el.id}
              align="center"
            >{`${el.name} ${el.surname}`}</TableCell>
            {cells}
          </TableRow>
        );
      });

    return body;
  };

  openDialogHandler = () => {
    this.setState({
      ...this.state,
      dialogOpen: true
    });
  };

  closeDialogHandler = () => {
    this.setState({
      ...this.state,
      dialogOpen: false
    });
  };

  createContent = content => {
    this.setState(
      {
        ...this.state,
        content: content
      },
      this.openDialogHandler
    );
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
        <AttendanceJournalActions
          onClickHandler={this.createContent}
          param={students}
        />
        <JournalTable
          body={this.createBody(
            this.state.students,
            this.state.attendanceForms
          )}
          headers={this.createHeaders(this.state.attendanceForms)}
        />
      </div>
    );
  }
}

export default Attendance;
