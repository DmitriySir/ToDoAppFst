import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

const TaskList = ({ tasks, onDeleted, onToggleCompleted, onToggleEditing, updateDescription }) => {
  const elements = tasks.map((el) => (
    <Task
      key={el.id}
      id={el.id}
      description={el.description}
      completed={el.completed}
      editing={el.editing}
      time={el.date}
      onDeleted={() => onDeleted(el.id)}
      onToggleCompleted={() => onToggleCompleted(el.id)}
      onToggleEditing={() => onToggleEditing(el.id)}
      updateDescription={(newDescription) => updateDescription(el.id, newDescription)}
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
};

export default TaskList;
