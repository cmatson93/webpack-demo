import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from "immutability-helper";
import './App.css';
import Input from './Input';
import Column from './Column';
import Card from './Card';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [
        {_id: 1, name: "delete modal", status: "todo"},
        {_id: 2, name: "upload image modal", status: "todo"},
        {_id: 3, name: "drag n drop", status: "doing"},
        {_id: 4, name: "Add search bar", status: "done"},
        {_id: 5, name: "Edit item", status: "done"},
        {_id: 6, name: "Add empty group", status: "done"}
      ],
      channels : [
        "todo", 
        "doing", 
        "done"
      ]
     }
  }

  

  handleTaskSubmit(task){

  }

  handleTaskInputChange(e){

  }

  update = (id, originalIndex, status) => {

    const { task, index } = this.findCard(id);

    const {tasks} = this.state;

    task.status = status;

    const newTasks = update(tasks, {
      $splice: [[index, 1], [originalIndex, 0, task]]
    })

    this.setState({tasks: newTasks})
  }

  findCard = (id) => {
    const {tasks} = this.state;
    const task = tasks.filter(task => task._id === id)[0]
    return {
      task, 
      index: tasks.indexOf(task)
    }
  }

  render() {
    

    const { tasks, channels } = this.state;

    return (
      <div className="App">
        <div className="Header">
          <h1>Christina's Kanban</h1>
          <Input 
            onClick={this.handleTaskSubmit}
            handleChange={this.handleTaskInputChange}
          />
        </div>
        <div className="board-contianer">
          {channels.map(channel => (
            <Column status={channel}>
              {tasks.filter(item => item.status === channel)
                .map(item => (
                  <Card 
                    status={item.status}
                    key={item._id}
                    task={item} 
                    id={item._id} 
                    findCard={this.findCard}
                    moveCard={this.update}
                  />
                ))
              }
            </Column>
          ))}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
