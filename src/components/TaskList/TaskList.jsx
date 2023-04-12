import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

const TaskList = ({ tasks, setTodoData }) => {
  const elements = tasks.map((el) => <Task key={el.id} setTodoData={setTodoData} item={el} />);

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.prototype = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  setTodoData: PropTypes.func.isRequired,
};

export default TaskList;
