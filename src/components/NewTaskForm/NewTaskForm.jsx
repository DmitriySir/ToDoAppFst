import React from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      labelMin: "",
      labelSec: "",
    };
  }

  updateDescription = (e) => {
    this.setState(() => ({
      description: e.target.value,
    }));
  };

  cheackTimeData = (e, setName) => {
    const { value } = e.target;

    const maxValue = 60;
    const minValue = 0;

    this.setState(() => {
      const numberValue = Number(value);
      let resultValue;

      if (numberValue > maxValue) {
        resultValue = maxValue.toString();
      } else if (numberValue < minValue) {
        resultValue = minValue.toString();
      } else {
        resultValue = numberValue.toString();
      }

      return { [setName]: resultValue };
    });
  };

  onLabelMinChange = (e) => {
    this.cheackTimeData(e, "labelMin");
  };

  onLabelSecChange = (e) => {
    this.cheackTimeData(e, "labelSec");
  };

  onSubmit = (e) => {
    const { onAddTask } = this.props;
    const { description, labelMin, labelSec } = this.state;

    let second;
    let minute;
    let flag = true;

    if (labelMin === "") {
      minute = 1;
    } else {
      minute = Number(labelMin);
    }

    if (labelSec === "") {
      second = 30;
    } else {
      second = Number(labelSec);
    }

    if (second <= 0 && minute <= 0) {
      flag = false;
    }

    if (e.key === "Enter" && description.trim() && flag) {
      onAddTask(description, minute * 60 + second);
      this.setState({
        description: "",
        labelMin: "",
        labelSec: "",
      });
    }
  };

  render() {
    const { description, labelMin, labelSec } = this.state;

    return (
      <>
        <h1>todos</h1>

        <header className="header">
          <form>
            <input
              onChange={this.updateDescription}
              onKeyDown={this.onSubmit}
              value={description}
              className="new-todo"
              placeholder="What needs to be done?"
            />

            <input
              type="number"
              className="new-todo__timer"
              placeholder="Min"
              onChange={this.onLabelMinChange}
              onKeyDown={this.onSubmit}
              value={labelMin}
            />

            <input
              type="number"
              className="new-todo__timer"
              placeholder="Sec"
              onChange={this.onLabelSecChange}
              onKeyDown={this.onSubmit}
              value={labelSec}
            />
          </form>
        </header>
      </>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
