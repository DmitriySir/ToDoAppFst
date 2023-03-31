import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";

import "./Task.css";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    const { onDeleted, onToggleCompleted, onToggleEditing, updateDescription, time, onTogglePlay, description, id } =
      this.props;

    this.onDeleted = onDeleted;
    this.onToggleCompleted = onToggleCompleted;
    this.onToggleEditing = onToggleEditing;
    this.updateDescription = updateDescription;
    this.onTogglePlay = onTogglePlay;

    this.description = description;
    this.id = id;

    this.state = { date: time };

    this.addTick = (date) => formatDistanceToNow(date, { includeSeconds: true });
    this.timeReform = (allTime) => {
      const newMinute = Math.floor(allTime / 60);
      const newSeconds = allTime % 60;
      return `${newMinute}:${newSeconds}`;
    };
  }

  componentDidMount() {
    const { tick } = this.props;
    this.timerID = setInterval(() => this.tick(), 1000);
    this.interval = setInterval(() => tick(this.id), 1000);
  }

  componentDidUpdate(prevProps) {
    const { tick, timerActive, allTime, replayTime, startTime } = this.props;
    if (allTime === 0) {
      replayTime(this.id, startTime);
      clearInterval(this.interval);
    } else if (timerActive !== prevProps.timerActive) {
      if (timerActive) {
        this.interval = setInterval(() => tick(this.id), 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.interval);
  }

  keyUp = (e) => {
    const { code } = e;
    const value = e.target.value.trim();

    if (code === "Enter") {
      if (value === this.description || value === "") {
        this.onToggleEditing();
      } else {
        this.updateDescription(value);
        this.onToggleEditing();
      }
    }
  };

  tick() {
    this.setState(({ date }) => ({
      date,
    }));
  }

  render() {
    const { date } = this.state;
    const { completed, editing, allTime, description } = this.props;

    let styleEl = "";
    let change = false;

    if (completed) {
      styleEl = classNames(styleEl, "completed");
      change = true;
    }

    if (editing) {
      styleEl = classNames(styleEl, "editing");
    }

    const Edit = <input onKeyUp={this.keyUp} defaultValue={description} type="text" className="edit" />;

    return (
      <li className={styleEl}>
        <div className="view">
          <input
            id={this.id}
            defaultChecked={change}
            onClick={this.onToggleCompleted}
            className="toggle"
            type="checkbox"
          />

          <label htmlFor={this.id}>
            <span className="description">{description}</span>
            <span className="timer">
              <button className="icon icon-play" type="button" onClick={this.onTogglePlay} />
              <button className="icon icon-pause" type="button" onClick={this.onTogglePlay} />
              <span className="time-text">{this.timeReform(allTime)}</span>
            </span>
            <span className="created">created {this.addTick(date)} ago</span>
          </label>

          <button onClick={this.onToggleEditing} className="icon icon-edit" />
          <button onClick={this.onDeleted} className="icon icon-destroy" />
        </div>

        {editing ? Edit : false}
      </li>
    );
  }
}

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  replayTime: PropTypes.func.isRequired,
  allTime: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  timerActive: PropTypes.bool.isRequired,
};
