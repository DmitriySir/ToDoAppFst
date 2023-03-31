import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

const TaskList = ({
  tasks,
  onDeleted,
  onToggleCompleted,
  onToggleEditing,
  updateDescription,
  onTogglePlay,
  tick,
  replayTime,
}) => {
  const elements = tasks.map((el) => (
    <Task
      key={el.id}
      id={el.id}
      description={el.description}
      completed={el.completed}
      editing={el.editing}
      time={el.date}
      allTime={el.allTime}
      startTime={el.startTime}
      onDeleted={() => onDeleted(el.id)}
      onToggleCompleted={() => onToggleCompleted(el.id)}
      onToggleEditing={() => onToggleEditing(el.id)}
      updateDescription={(newDescription) => updateDescription(el.id, newDescription)}
      onTogglePlay={() => onTogglePlay(el.id)}
      tick={() => tick(el.id)}
      replayTime={() => replayTime(el.id, el.startTime)}
      timerActive={el.timerActive}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.prototype = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
  replayTime: PropTypes.func.isRequired,
};

export default TaskList;
