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
      todoData: [this.createDataTask("drink coffee", 10), this.createDataTask("create app", 10)],
      filter: "All",
    };

    this.getIndex = (arr, id) => arr.findIndex((el) => el.id === id);
    this.toggleProperty = (arr, index, newData) => {
      const newItem = { ...arr[index], ...newData };
      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    };
    this.dataFilter = (flag, todoData) => {
      switch (flag) {
        case "All":
          return todoData;
        case "Active":
          return todoData.filter((el) => !el.completed);
        case "Completed":
          return todoData.filter((el) => el.completed);
        default:
          return todoData;
      }
    };
  }

  createDataTask = (description, allTime) => ({
    id: this.ids++,
    description,
    completed: false,
    editing: false,
    date: new Date(),
    startTime: allTime,
    allTime,
    timerActive: true,
  });

  onAddTask = (text, time) => {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, this.createDataTask(text, time)],
    }));
  };

  onDeleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = this.getIndex(todoData, id);

      return {
        todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
      };
    });
  };

  updateDescription = (id, newDescription) => {
    this.setState(({ todoData }) => {
      const data = this.toggleProperty(todoData, this.getIndex(todoData, id), { description: newDescription });
      return { todoData: data };
    });
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

  onTogglePlay = (id) => {
    this.toggleBooleanTask(id, "timerActive");
  };

  clearTaskCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  tick = (id) => {
    this.setState(({ todoData }) => {
      const index = this.getIndex(todoData, id);

      return {
        todoData: this.toggleProperty(todoData, index, { allTime: todoData[index].allTime - 1 }),
      };
    });
  };

  replayTime = (id, startTime) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, this.getIndex(todoData, id), { allTime: startTime, timerActive: false }),
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
            onDeleted={this.onDeleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            updateDescription={this.updateDescription}
            onTogglePlay={this.onTogglePlay}
            tick={this.tick}
            replayTime={this.replayTime}
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
