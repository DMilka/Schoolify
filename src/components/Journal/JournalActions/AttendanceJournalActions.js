import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MarksAddForm from "../../Forms/JournalForm/MarksAddForm";
import AttendanceCheckForm from "../../Forms/JournalForm/AttendanceCheckForm";
import AddDayForm from "../../Forms/JournalForm/AddDayForm";

class AttendanceJournalActions extends Component {
  constructor(props) {
    super(props);
  }

  createDay = () => {
    this.props.onClickHandler(
      <AttendanceCheckForm students={this.props.param} />
    );
  };

  addDay = () => {
    this.props.onClickHandler(<AddDayForm />);
  };

  render() {
    return (
      <div
        style={{ margin: "10px auto", textAlign: "center", padding: "10px" }}
      >
        <Button color="primary" variant="contained" onClick={this.addDay}>
          Dodaj zajęcia
        </Button>
      </div>
    );
  }
}

export default AttendanceJournalActions;
