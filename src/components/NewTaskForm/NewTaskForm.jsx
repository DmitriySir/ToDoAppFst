import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import React, { useState } from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

const NewTaskForm = ({ setTodoData }) => {
  const [description, setDescription] = useState("");
  const [labelMin, setLabelMin] = useState("");
  const [labelSec, setLabelSec] = useState("");

  const createDataTask = (title, allTime) => {
    const ids = Base64.stringify(sha256(`${title}|${Date.now()}|${new Date()}|${allTime}`));

    return {
      id: ids,
      description: title,
      completed: false,
      editing: false,
      date: new Date(),
      startTime: allTime,
      allTime,
      timerActive: true,
    };
  };

  const onAddTask = (text, sec) => {
    setTodoData((data) => [...data, createDataTask(text, sec)]);
  };

  function updateDescription(e) {
    setDescription(e.target.value);
  }

  function onLabelMinChange(e) {
    setLabelMin(Number(e.target.value));
  }

  function onLabelSecChange(e) {
    setLabelSec(Number(e.target.value));
  }

  function onSubmit(e) {
    let second;
    let minute;

    if (labelMin === "") {
      minute = 1;
    } else {
      minute = labelMin;
    }

    if (labelSec === "") {
      second = 30;
    } else {
      second = labelSec;
    }

    if (e.key === "Enter" && description.trim()) {
      onAddTask(description, minute * 60 + second);

      setDescription("");
      setLabelMin("");
      setLabelSec("");
    }
  }

  return (
    <>
      <h1>todos</h1>

      <header className="header">
        <form>
          <input
            onChange={updateDescription}
            onKeyDown={onSubmit}
            value={description}
            className="new-todo"
            placeholder="What needs to be done?"
          />

          <input
            type="number"
            className="new-todo__timer"
            placeholder="Min"
            onChange={onLabelMinChange}
            onKeyDown={onSubmit}
            value={labelMin}
          />

          <input
            type="number"
            className="new-todo__timer"
            placeholder="Sec"
            onChange={onLabelSecChange}
            onKeyDown={onSubmit}
            value={labelSec}
          />
        </form>
      </header>
    </>
  );
};

NewTaskForm.propTypes = {
  setTodoData: PropTypes.func.isRequired,
};

export default NewTaskForm;
