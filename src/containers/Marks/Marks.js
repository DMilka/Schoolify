import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ModuleNavigation from "../../components/Navigation/ModuleNavigation/ModuleNavigation";
import JournalTable from "../../components/Journal/JournalTable/JournalTable";
import DialogTemplate from "../../components/Dialog/DialogTemplate";
import MarksJournalActions from "../../components/Journal/JournalActions/MarksJournalActions";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { get, deleteCall } from "../../Helpers/Auth/ApiCalls";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import MarkEditForm from "../../components/Forms/JournalForm/MarkEditForm";

class Marks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      content: "mark",
      avgType: props.location.state.module.averageTypeId.type,
      finishModule: props.location.state.module.endDate,
      loading: true,
      editedMark: null,
      editedMarkDialog: false,
      editMode: false
    };
  }

  componentDidMount = () => {
    this.init();
  };

  init = () => {
    this.setState(
      {
        ...this.state,
        loading: true
      },
      get(
        "http://localhost:8000/api/students?moduleId=" +
          localStorage.getItem("s_moduleId"),
        null,
        null,
        data => {
          const studentsMarks = [];
          console.log(data);
          data["hydra:member"].forEach(el => {
            el.marks.forEach(el2 => {
              studentsMarks[el2.id] = false;
            });
          });
          get(
            "http://localhost:8000/api/mark_forms?moduleId=" +
              localStorage.getItem("s_moduleId"),
            null,
            null,
            data => {
              console.log(data);
              this.setState(
                {
                  ...this.state,
                  errorMsg: null,
                  loading: false,
                  markForms: data
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

          this.setState(
            {
              ...this.state,
              errorMsg: null,
              studentsMarksEdit: studentsMarks,
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
      )
    );
  };

  logFunc = () => {
    console.log(this.state);
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

  openDialogHandler = () => {
    this.setState({
      ...this.state,
      dialogOpen: true
    });
  };

  toggleEditMode = () => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
  };

  closeDialogHandler = () => {
    this.init();
    this.setState({
      ...this.state,
      dialogOpen: false,
      editedMarkDialog: false
    });
  };

  editMark = mark => {
    this.setState({
      ...this.state,
      editedMark: mark,
      editedMarkDialog: true
    });
  };

  createTableCell = (marks, marksTypes) => {
    const cells = [];
    let cell = null;

    if (marksTypes) {
      marksTypes["hydra:member"].forEach(markType => {
        cell = null;
        marks.forEach(mark => {
          if (markType["@id"] === mark.markformId) {
            cell = (
              <TableCell id={mark.id} key={mark.id} align="center">
                {mark.value}
                {mark.oldValue ? ` ( ${mark.oldValue} )` : null}
                {this.state.editMode ? (
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => this.editMark(mark)}
                  >
                    <CreateIcon />
                  </IconButton>
                ) : null}
              </TableCell>
            );
          }
        });

        if (cell === null) {
          cell = <TableCell key={markType.id} align="center"></TableCell>;
        }

        cells.push(cell);
      });

      if (this.state.finishModule) {
        cell = this.createLastMark(marks, marksTypes);
        cells.push(cell);
      }

      return cells;
    }
  };

  markHelper = (number, roundto) => {
    return roundto * Math.round(number / roundto);
  };

  createLastMark = (marks, marksTypes) => {
    let cell = null;

    if (this.state.finishModule) {
      if (this.state.avgType === "ar_avg") {
        let sum = 0;
        let divider = 0;
        marks.forEach(mark => {
          if (mark.value) {
            sum += mark.value;
            divider++;
          }
        });
        if (divider > 0) {
          cell = (
            <TableCell align="center">
              {this.markHelper(sum / divider, 0.5)}
            </TableCell>
          );
        }
      }

      if (this.state.avgType === "we_avg") {
        let gora = 0;
        let dol = 0;

        marksTypes["hydra:member"].forEach(markType => {
          marks.forEach(mark => {
            if (mark.value && markType["@id"] === mark.markformId) {
              gora += mark.value * markType.avgValue;
              dol += markType.avgValue;
            }
          });
        });

        if (dol > 0) {
          cell = (
            <TableCell align="center">
              {this.markHelper(gora / dol, 0.5)}
            </TableCell>
          );
        }
      }
    }

    return cell;
  };

  createBody = (students, formTypes) => {
    let body = [];
    students &&
      students["hydra:member"].map(el => {
        let cells = this.createTableCell(el.marks, formTypes);
        body.push(
          <TableRow>
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

  createHeaders = items => {
    const headers = [];
    if (items && items["hydra:member"].length > 0) {
      items["hydra:member"].map(el => {
        headers.push(
          <TableCell key={el.id} id={el.id} align="center">
            {el.avgValue ? `${el.name} ( ${el.avgValue} )` : el.name}
          </TableCell>
        );
      });

      if (this.state.finishModule) {
        headers.push(<TableCell align="center">Ocena końcowa</TableCell>);
      }
    } else {
      return <TableCell align="center">Brak danych</TableCell>;
    }

    return headers;
  };

  finishModule = () => {};

  render() {
    console.log(this.state);
    return this.state.loading ? (
      <span>Loading...</span>
    ) : (
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
        {!this.state.finishModule && (
          <MarksJournalActions
            onClickHandler={this.createContent}
            avgType={this.state.avgType}
            students={this.state.students}
            markForms={this.state.markForms}
            toggleEditMode={this.toggleEditMode}
            finishModule={this.finishModule}
          />
        )}

        <JournalTable
          body={this.createBody(this.state.students, this.state.markForms)}
          headers={this.createHeaders(this.state.markForms)}
        />
        <DialogTemplate
          open={this.state.editedMarkDialog}
          content={<MarkEditForm mark={this.state.editedMark} />}
          onClose={this.closeDialogHandler}
          actionButtons={
            <Button color="secondary" onClick={this.closeDialogHandler}>
              Zamknij
            </Button>
          }
        />
        <DialogTemplate
          open={this.state.finishModuleD}
          content={<MarkEditForm mark={this.state.editedMark} />}
          onClose={this.closeDialogHandler}
          actionButtons={
            <Button color="secondary" onClick={this.closeDialogHandler}>
              Zamknij
            </Button>
          }
        />
      </div>
    );
  }
}

export default withRouter(Marks);
