import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import classes from "./Dashboard.css";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogTemplate from "../../components/Dialog/DialogTemplate";
import NewModuleForm from "../../components/Forms/Module/NewModuleForm";
import { Redirect, withRouter } from "react-router-dom";
import { get, post, deleteCall } from "../../Helpers/Auth/ApiCalls";
import { moment } from "moment";
import DoneIcon from "@material-ui/icons/Done";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      delete: false,
      loading: true,
      errorMsg: null,
      successMsg: null,
      warningMsg: null,
      data: null,
      redirectToMarks: false
    };
  }

  componentDidMount() {
    //  get = (url, paramsObj, headersObj, callback, callbackError);
    const userId = localStorage.getItem("s_userid");

    if (!userId) {
      this.setState({
        ...this.state,
        errorMsg: "Wystąpił nieoczekiwany błąd.",
        loading: false
      });
    } else {
      this.init();
    }
  }

  init = () => {
    const userId = localStorage.getItem("s_userid");
    get(
      "http://localhost:8000/api/modules?teacherId=" + userId,
      null,
      null,
      data => {
        console.log(data);
        this.setState({
          ...this.state,
          errorMsg: null,
          loading: false,
          data: data
        });
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
  };

  addModuleToggleHandler = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  };

  confirmDeleteHandler = id => {
    console.log(id);
    this.setState(
      {
        ...this.state,
        errorMsg: null,
        loading: true
      },
      () =>
        deleteCall(
          "http://localhost:8000",
          id,
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
          },
          res => {
            console.log(res);
            this.init();
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

  showModule = module => {
    localStorage.setItem("s_moduleId", module.id);
    this.setState({
      ...this.state,
      redirectToMarks: true,
      moduleId: module.id,
      module: module
    });
  };

  render() {
    if (this.state.redirectToMarks) {
      return (
        <Redirect
          to={{
            pathname: "/module",
            state: { module: this.state.module }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <Grid container justify="center" className={classes.Dashboard}>
          <Grid item xs={12} md={12} lg={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addModuleToggleHandler}
            >
              Dodaj moduł
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.Dashboard}>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <Grid item xs={12} md={12} lg={6}>
              <Paper elevation={5}>
                <Table aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Moduł/Przedmiot</TableCell>
                      <TableCell align="center">Grupa/Klasa</TableCell>
                      <TableCell align="center">Data rozpoczęcia</TableCell>
                      <TableCell align="center">Data zakończenia</TableCell>
                      <TableCell align="center">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.data &&
                      this.state.data["hydra:member"].map(row => (
                        <TableRow key={row.id}>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.className}</TableCell>
                          <TableCell align="center">
                            {new Date(row.startDate).toDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {row.endDate ? row.endDate : "Trwa"}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="contained"
                              color="primary"
                              onClick={() => this.showModule(row)}
                            >
                              <VisibilityRoundedIcon />
                            </IconButton>
                            <IconButton
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                this.confirmDeleteHandler(row["@id"])
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              variant="contained"
                              color="secondary"
                              onClick={() => {}}
                            >
                              <DoneIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          )}
        </Grid>
        <DialogTemplate
          open={this.state.open}
          onClose={this.addModuleToggleHandler}
          TransitionComponent={Transition}

          title={"Dodaj nowy moduł"}
          content={<NewModuleForm callback={this.init} />}
        />
        <DialogTemplate
          open={this.state.delete}
          TransitionComponent={Transition}

          onClose={this.confirmDeleteHandler}
          title={"Czy napewno usunąć"}
          actionButtons={
            <React.Fragment>
              <Button
                onClick={this.confirmDeleteHandler}
                variant={"contained"}
                color="secondary"
              >
                Tak
              </Button>
              <Button
                onClick={this.confirmDeleteHandler}
                variant={"contained"}
                color="primary"
              >
                Nie
              </Button>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
