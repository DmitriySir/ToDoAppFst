import React, { useState } from "react";

import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState("All");

  const dataFilter = (flag, data) => {
    let filterData;

    switch (flag) {
      case "All":
        filterData = data;
        break;
      case "Active":
        filterData = data.filter((el) => !el.completed);
        break;
      case "Completed":
        filterData = data.filter((el) => el.completed);
        break;
      default:
        break;
    }

    return filterData;
  };

  const allTaskCount = todoData.length;
  const completedTaskCount = todoData.filter((el) => el.completed).length;
  const notCompletedTaskCount = allTaskCount - completedTaskCount;

  const tasks = dataFilter(filter, todoData);

  return (
    <section className="todoapp">
      <NewTaskForm setTodoData={setTodoData} />

      <section className="main">
        <TaskList tasks={tasks} setTodoData={setTodoData} />

        <Footer
          setTodoData={setTodoData}
          filterFunc={setFilter}
          filterFlag={filter}
          tasksCount={notCompletedTaskCount}
        />
      </section>
    </section>
  );
};

export default App;
