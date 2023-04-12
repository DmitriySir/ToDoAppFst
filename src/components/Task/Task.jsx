import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";

import "./Task.css";

const Task = ({ setTodoData, item }) => {
  const { id, description, completed, editing, date: time, allTime, startTime, timerActive } = item;

  const [date, setDate] = useState(time);

  const getIndex = (arr, idItem) => arr.findIndex((el) => el.id === idItem);
  const toggleProperty = (arr, index, newData) => {
    const newItem = { ...arr[index], ...newData };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const updateDescription = (idItem, newDescription) => {
    setTodoData((data) => toggleProperty(data, getIndex(data, idItem), { description: newDescription }));
  };

  const tick = (idItem) => {
    setTodoData((data) => {
      const index = getIndex(data, idItem);
      return toggleProperty(data, index, { allTime: data[index].allTime - 1 });
    });
  };

  const replayTime = (idItem, zeroTime) => {
    setTodoData((data) => toggleProperty(data, getIndex(data, idItem), { allTime: zeroTime, timerActive: false }));
  };

  const onDeleteTask = (idItem) => {
    setTodoData((data) => {
      const index = getIndex(data, idItem);
      return [...data.slice(0, index), ...data.slice(index + 1)];
    });
  };

  const toggleBooleanTask = (idItem, propName) => {
    setTodoData((data) => {
      const index = getIndex(data, idItem);
      const newData = (i, arr, prop) => !arr[i][prop];
      return toggleProperty(data, index, { [propName]: newData(index, data, propName) });
    });
  };

  const onToggleEditing = (idItem) => {
    toggleBooleanTask(idItem, "editing");
  };

  const onToggleCompleted = (idItem) => {
    toggleBooleanTask(idItem, "completed");
  };

  const onTogglePlay = (idItem) => {
    toggleBooleanTask(idItem, "timerActive");
  };

  const addTick = (dateState) => formatDistanceToNow(dateState, { includeSeconds: true });
  const timeReform = (oldTime) => {
    const newMinute = Math.floor(oldTime / 60);
    const newSeconds = oldTime % 60;
    return `${newMinute}:${newSeconds}`;
  };

  useEffect(() => {
    const timerID = setInterval(() => setDate(date), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => timerActive && tick(id), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [allTime, timerActive]);

  useEffect(() => {
    if (allTime === 0) {
      replayTime(id, startTime);
    }
  }, [allTime]);

  function keyUp(e) {
    if (e.code === "Enter") {
      updateDescription(id, e.target.value);
      onToggleEditing(id);
    }
  }

  let styleEl = "";
  let change = false;

  if (completed) {
    styleEl = classNames(styleEl, "completed");
    change = true;
  }

  if (editing) {
    styleEl = classNames(styleEl, "editing");
  }

  const EditComponent = <input onKeyUp={keyUp} defaultValue={description} type="text" className="edit" />;

  return (
    <li className={styleEl}>
      <div className="view">
        <input
          id={id}
          defaultChecked={change}
          onClick={() => onToggleCompleted(id)}
          className="toggle"
          type="checkbox"
        />

        <label htmlFor={id}>
          <span className="description">{description}</span>
          <span className="timer">
            <button className="icon icon-play" type="button" onClick={() => onTogglePlay(id)} />
            <button className="icon icon-pause" type="button" onClick={() => onTogglePlay(id)} />
            <span className="time-text">{timeReform(allTime)}</span>
          </span>
          <span className="created">created {addTick(date)} ago</span>
        </label>

        <button onClick={() => onToggleEditing(id)} className="icon icon-edit" />
        <button onClick={() => onDeleteTask(id)} className="icon icon-destroy" />
      </div>

      {editing ? EditComponent : false}
    </li>
  );
};

Task.propTypes = {
  setTodoData: PropTypes.func.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
    allTime: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    timerActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Task;
