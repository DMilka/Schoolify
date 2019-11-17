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
import { get, post, put } from "../../Helpers/Auth/ApiCalls";
import moment from "moment";
import {
  formErrorLabel,
  formErrorBigLabel,
  formSuccessBigLabel
} from "../../Helpers/Styles/globalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

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
      errorMsg: null,
      formValues: [],
      actualSessionFormValues: {}
    };
  }

  init = () => {
    this.setState(
      {
        ...this.state,
        loading: true
      },
      () =>
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
                let attendances = [];
                data["hydra:member"].forEach(el => {
                  el.attendances.forEach(el2 => {
                    let attenFormId = el2.attendanceFormId.split("/");
                    // console.log(attenFormId);
                    attendances[`${el.id}_${attenFormId[3]}_${el2.id}`] = {
                      value: el2.value,
                      studentId: el["@id"],
                      attendanceFormId: el2.attendanceFormId
                    };
                  });
                });
                this.setState(
                  {
                    ...this.state,
                    errorMsg: null,
                    loading: false,
                    attendanceForms: data2,
                    students: data,
                    formValues: attendances
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
        )
    );
  };

  componentDidMount = () => {
    this.init();
  };

  handleChange = value => {
    const data = value;
    const splittedData = data.split("_");

    const studentId = splittedData[0];
    const attendanceFormId = splittedData[1];
    const attendanceId = splittedData[2];

    let attendance = {
      value: true,
      studentId: `/api/students/${studentId}`,
      attendanceFormId: `/api/attendance_forms/${attendanceFormId}`
    };

    if (this.state.formValues && this.state.formValues[value]) {
      attendance = {
        ...attendance,
        value: false
      };

      if (
        this.state.formValues &&
        this.state.formValues[value] &&
        this.state.actualSessionFormValues &&
        this.state.actualSessionFormValues[value]
      ) {
        this.setState(
          {
            ...this.state,

            actualSessionFormValues: {
              ...this.state.actualSessionFormValues,
              [value]: undefined
            }
          },
          () => {
            console.log(this.state);
            console.log(Object.values(this.state.actualSessionFormValues));
          }
        );
      } else {
        this.setState(
          {
            ...this.state,

            actualSessionFormValues: {
              ...this.state.actualSessionFormValues,
              [value]: {
                ...attendance,
                value: !this.state.formValues[value].value
              }
            }
          },
          () => {
            console.log(this.state);
            console.log(Object.values(this.state.actualSessionFormValues));
          }
        );
      }
    } else {
      if (
        this.state.actualSessionFormValues &&
        this.state.actualSessionFormValues[value]
      ) {
        this.setState(
          {
            ...this.state,

            actualSessionFormValues: {
              ...this.state.actualSessionFormValues,
              [value]: undefined
            }
          },
          () => {
            console.log(this.state);
            console.log(Object.values(this.state.actualSessionFormValues));
          }
        );
      } else {
        this.setState(
          {
            ...this.state,

            actualSessionFormValues: {
              ...this.state.actualSessionFormValues,
              [value]: attendance
            }
          },
          () => {
            console.log(this.state);
            console.log(Object.values(this.state.actualSessionFormValues));
          }
        );
      }
    }
  };

  confirmAttendance = () => {
    const entries = Object.entries(this.state.actualSessionFormValues);

    for (const [key, value] of entries) {
      // console.log(key);
      // console.log(value);
      if (value !== undefined) {
        console.log(key);
        console.log(value);
        if (this.state.formValues[key]) {
          const data = key;
          const splittedData = data.split("_");

          const studentId = splittedData[0];
          const attendanceFormId = splittedData[1];
          const attendanceId = splittedData[2];
          console.log(studentId, attendanceFormId, attendanceId);
          put(
            `http://localhost:8000/api/attendances/${attendanceId}`,
            value,
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
            },
            res => console.log(res),
            err => console.log(err)
          );
        } else {
          post(
            "http://localhost:8000/api/attendances",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
            },
            {
              ...value
            },
            () => {
              this.setState({
                ...this.state,
                afterRegisterError: null,
                loading: false,
                afterRegisterMsg: "Pomyślnie zatwierdzono sprawdzanie"
              });
            },
            () => {
              this.setState({
                ...this.state,
                afterRegisterError: "Wystąpił nieoczekiwany problem",
                loading: false,
                afterRegisterMsg: null
              });
            }
          );
        }

        //
      }
    }
    // this.state.actualSessionFormValues.forEach(el => {
    //   if (el !== undefined) {
    //     console.log(el);
    //    post(
    //   "http://localhost:8000/api/attendances",
    //   {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods":
    //       "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers":
    //       "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    //   },
    //   {
    //     ...el
    //   },
    //   () => {
    //     this.setState({
    //       ...this.state,
    //       afterRegisterError: null,
    //       loading: false,
    //       afterRegisterMsg: "Pomyślnie zatwierdzono sprawdzanie"
    //     });
    //   },
    //   () => {
    //     this.setState({
    //       ...this.state,
    //       afterRegisterError: "Wystąpił nieoczekiwany problem",
    //       loading: false,
    //       afterRegisterMsg: null
    //     });
    //   }
    // );
    //
    // }
    // });
  };

  checkActualSessionFormValues = () => {
    let inc = 0;

    Object.values(this.state.actualSessionFormValues).forEach(el => {
      if (el !== undefined) inc++;
    });

    return inc;
  };

  createTableCell = (attendance, dates, studentid) => {
    const cells = [];
    let cell = null;
    let inc = 0;
    const formValues = [];
    dates &&
      dates["hydra:member"].forEach(date => {
        inc++;
        cell = null;
        attendance.forEach(attendance => {
          if (date["@id"] === attendance.attendanceFormId) {
            cell = (
              <TableCell
                id={attendance.id}
                key={attendance.attendanceFormId}
                align="center"
              >
                <Checkbox
                  defaultChecked={attendance.value}
                  value={`${studentid}_${date.id}_${attendance.id}`}
                  onChange={() =>
                    this.handleChange(
                      `${studentid}_${date.id}_${attendance.id}`
                    )
                  }
                  disabled={
                    moment(date.date).format("DD-MM-YYYY") !==
                    moment().format("DD-MM-YYYY")
                  }
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
                <Checkbox
                  value={`${studentid}_${date.id}`}
                  onChange={() => this.handleChange(`${studentid}_${date.id}`)}
                  disabled={
                    moment(date.date).format("DD-MM-YYYY") !==
                    moment().format("DD-MM-YYYY")
                  }
                />
              </TableCell>
            );
          }
        });

        if (cell === null) {
          cell = (
            <TableCell key={date.id + "_" + inc} align="center">
              <Checkbox
                value={`${studentid}_${date.id}`}
                onChange={() => this.handleChange(`${studentid}_${date.id}`)}
                disabled={
                  moment(date.date).format("DD-MM-YYYY") !==
                  moment().format("DD-MM-YYYY")
                }
              />
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
        let cells = this.createTableCell(el.attendances, dates, el.id);
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
    this.init();
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
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {this.checkActualSessionFormValues() > 0 && (
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={this.confirmAttendance}
            >
              Zatwierdź sprawdzanie
            </Button>
          )}
          {this.state.loading ? (
            <Grid item xs={12} md={12} lg={12}>
              <CircularProgress color="secondary" />
            </Grid>
          ) : null}
          <Grid item xs={12} md={12} lg={12}>
            <span style={formErrorBigLabel}>
              {this.state.afterRegisterError}
            </span>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <span style={formSuccessBigLabel}>
              {this.state.afterRegisterMsg}
            </span>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Attendance;
