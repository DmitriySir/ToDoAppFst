import PropTypes from "prop-types";

import TasksFilter from "../TasksFilter";

import "./Footer.css";

const Footer = ({ tasksCount, clearComplated, filterFunc, filterFlag }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount}items left</span>

      <TasksFilter filterFunc={filterFunc} filterFlag={filterFlag} />

      <button onClick={clearComplated} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.prototype = {
  tasksCount: PropTypes.number.isRequired,
  filterFlag: PropTypes.string.isRequired,
  clearComplated: PropTypes.func.isRequired,
  filterFunc: PropTypes.func.isRequired,
};

export default Footer;
