import React from "react";
import PropTypes from "prop-types";

import "./TasksFilter.css";

const TasksFilter = ({ filterFunc, filterFlag }) => {
  const arrFilter = ["All", "Active", "Completed"];

  return (
    <ul className="filters">
      {arrFilter.map((el) => (
        <li key={el}>
          <input type="radio" id={el} onClick={() => filterFunc(el)} />
          <label htmlFor={el} className={el === filterFlag ? "selected" : ""}>
            {el}
          </label>
        </li>
      ))}
    </ul>
  );
};

TasksFilter.prototype = {
  filterFunc: PropTypes.func.isRequired,
  filterFlag: PropTypes.string.isRequired,
};

export default TasksFilter;
