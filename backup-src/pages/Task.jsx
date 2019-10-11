import React, { Component } from "react";
import PropTypes from "prop-types";

import tasksService from "../services/tasksService";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {}
    };
  }
  componentDidMount() {
    tasksService.getTask(this.props.match.params.taskId)
      .then(task => {
        this.setState({task});
      });
  }

  render() {
    return (
      <div className="portal-body">
        <h1>
          Task: {this.state.task.title}
        </h1>
      </div>
    );
  }
}

Task.propTypes = {
  match: PropTypes.object.isRequired
};
export default Task;
