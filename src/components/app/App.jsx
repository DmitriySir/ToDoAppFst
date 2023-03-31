import React from "react";

import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.ids = 0;

    this.state = {
      todoData: [this.createDataTask("drink coffee"), this.createDataTask("create react app")],
      filter: "All",
    };

    this.getIndex = (arr, id) => arr.findIndex((el) => el.id === id);
    this.toggleProperty = (arr, index, newData) => {
      const newItem = { ...arr[index], ...newData };
      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    };
    this.dataFilter = (flag, todoData) => {
      let filterData;

      switch (flag) {
        case "All":
          filterData = todoData;
          break;
        case "Active":
          filterData = todoData.filter((el) => !el.completed);
          break;
        case "Completed":
          filterData = todoData.filter((el) => el.completed);
          break;
        default:
          break;
      }

      return filterData;
    };
  }

  createDataTask = (description) => ({
    id: this.ids++,
    description,
    completed: false,
    editing: false,
    date: new Date(),
  });

  onAddTask = (text) => {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, this.createDataTask(text)],
    }));
  };

  ondeleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = this.getIndex(todoData, id);

      return {
        todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
      };
    });
  };

  updateDescription = (id, newDescription) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, this.getIndex(todoData, id), { description: newDescription }),
    }));
  };

  toggleBooleanTask = (id, propName) => {
    this.setState(({ todoData }) => {
      const index = this.getIndex(todoData, id);

      const newData = (i, arr, prop) => !arr[i][prop];

      return {
        todoData: this.toggleProperty(todoData, index, { [propName]: newData(index, todoData, propName) }),
      };
    });
  };

  onToggleEditing = (id) => {
    this.toggleBooleanTask(id, "editing");
  };

  onToggleCompleted = (id) => {
    this.toggleBooleanTask(id, "completed");
  };

  clearTaskCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  onToggleFilter = (flag) => {
    this.setState(() => ({
      filter: flag,
    }));
  };

  render() {
    const { filter, todoData } = this.state;

    const allTaskCount = todoData.length;
    const completedTaskCount = todoData.filter((el) => el.completed).length;
    const notCompletedTaskCount = allTaskCount - completedTaskCount;

    const tasks = this.dataFilter(filter, todoData);

    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.onAddTask} />

        <section className="main">
          <TaskList
            tasks={tasks}
            onDeleted={this.ondeleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            updateDescription={this.updateDescription}
          />

          <Footer
            clearComplated={this.clearTaskCompleted}
            filterFunc={this.onToggleFilter}
            filterFlag={filter}
            tasksCount={notCompletedTaskCount}
          />
        </section>
      </section>
    );
  }
}
