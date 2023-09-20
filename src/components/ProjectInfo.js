

//import { Card, Button, Tooltip, Form, InputGroup, FormControl, OverlayTrigger, Row, Col } from 'react-bootstrap';

import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Card, Button, Tooltip, Form, InputGroup, FormControl, OverlayTrigger, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { /* ... other imports ... */ } from 'react-bootstrap';

class ProjectInfo extends Component {
  state = {
    newTaskDescription: '',
  };

  componentDidMount() {
    // Call the sendDeadlineNotification function when the component is mounted
    this.sendDeadlineNotification();
  }

  onChangeTaskDescription = (e) => {
    this.setState({ newTaskDescription: e.target.value });
  }

  submitTask = () => {
    let description = this.state.newTaskDescription;
    this.setState({ newTaskDescription: '' });
    let token = localStorage.getItem('token');
    axios
      .post(
        `http://localhost:5000/tasks/create`,
        { description: description, projectId: this.props.project._id },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) this.props.getProjects();
      })
      .catch((err) => {
        console.log(err);
        console.error('Could not create project.');
      });
  }

  completeTask = (event) => {
    let taskId = event.target.id;
    let token = localStorage.getItem('token');
    axios
      .post(
        `http://localhost:5000/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) this.props.getProjects();
      })
      .catch((err) => {
        console.log(err);
        console.error('Could not complete task.');
      });
  }

  removeTask = (event) => {
    let taskId = event.currentTarget.id;
    let token = localStorage.getItem('token');
    axios
      .delete(
        `http://localhost:5000/tasks/${taskId}/delete`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) this.props.getProjects();
      })
      .catch((err) => {
        console.log(err);
        console.error('Could not delete task.');
      });
  }

  removeProject = () => {
    let projectId = this.props.project._id;
    let token = localStorage.getItem('token');
    axios
      .delete(
        `http://localhost:5000/projects/${projectId}/delete`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) this.props.getProjects();
      })
      .catch((err) => {
        console.log(err);
        console.error('Could not delete project.');
      });
  }

  // Function to check if a project's deadline has passed
  isProjectDeadlinePassed = () => {
    return moment().isAfter(this.props.project.deadline, 'day');
  }

  sendDeadlineNotification = () => {
    const today = moment();
    const projectDeadline = moment(this.props.project.deadline);

    if (today.isSame(projectDeadline, 'day')) {
      const token = localStorage.getItem('token');
      const projectId = this.props.project._id;

      axios
        .post(`http://localhost:5000/projects/send-deadline-notification`, {}, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // Handle success, e.g., show a notification to the user
          }
        })
        .catch((err) => {
          console.error('Error sending deadline notification:', err);
        });
    }
  }

  render() {
    const style = {
      backgroundColor: 'rgba(162, 180, 200, 0.5)',
      padding: '20px',
      marginTop: '50px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const completedStyle = {
      backgroundColor: 'rgba(182, 200, 216, 0.5)',
      marginTop: '50px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    };

    const projectDeadlineStyle = {
      backgroundColor: this.isProjectDeadlinePassed() ? 'red' : 'rgba(182, 200, 216, 0.5)',
      color: 'white',
    };

    let completedTasks = [], ongoingTasks = [];

    for (let task of this.props.project.tasks) {
      if (task.completed) {
        completedTasks.push(task);
      } else {
        ongoingTasks.push(task);
      }
    }

    const renderCompletedTasks = completedTasks.map((task, key) => (
      <OverlayTrigger key={task._id} placement="right" overlay={
        <Tooltip id={`tooltip-${"right"}`}>
          Finished on {moment(task.completionDate).format('YYYY-DD-MM')}.
        </Tooltip>
      }>
        <p key={task._id} style={completedStyle}>{task.description}</p>
      </OverlayTrigger>
    ));

    const renderOngoingTasks = ongoingTasks.map((task, key) => (
      <div key={task._id} style={{ marginBottom: "15px" }}>
        <Form.Check id={task._id} key={task._id} type="checkbox" label={task.description} onChange={this.completeTask} style={{ display: "inline-block", marginRight: "20px" }} />
        <Button id={task._id} variant="outline-danger" size="sm" onClick={this.removeTask} style={{ float: "right" }}> <FontAwesomeIcon id={task._id} color="red" icon="times" />  </Button>
      </div>
    ));

    return (
      <Card style={style}>
        <Card.Body>
          <Row>
            <Col xs={10}>  <Card.Title >{this.props.project.name}</Card.Title></Col>
            <Col xs={2}>  <Button id={this.props.project._id} onClick={this.removeProject} variant="outline-danger" size="sm" style={{ float: "right" }}><FontAwesomeIcon color="red" icon="trash-alt" /></Button></Col>
          </Row>

          <Card.Text>
            {this.props.project.description}
          </Card.Text>
          <h6>Active tasks: </h6>
          <Form.Group controlId="activeTasks">
            {renderOngoingTasks}
          </Form.Group>

          <h6>Completed tasks: </h6>
          <div style={completedStyle}>
            {renderCompletedTasks}
          </div>
          <h6>Project Deadline :</h6>
          <div style={projectDeadlineStyle}>
            {moment(this.props.project.deadline).format('YYYY-MM-DD')}
          </div>
          <InputGroup className="mb-3">
            <FormControl placeholder="New task description" aria-label="New task description" aria-describedby="basic-addon2" value={this.state.newTaskDescription} onChange={this.onChangeTaskDescription} />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.submitTask}>Add task</Button>
            </InputGroup.Append>
          </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ProjectInfo;
