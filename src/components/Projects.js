import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectInfo from "./ProjectInfo";
import { Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap';

class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            description: "",
            deadline: "",
            projects: [],
            showPopup: false,
            error: null,
        };
    }

    handleShow() {
        this.setState({ showPopup: true });
    }

    handleClose() {
        this.setState({ showPopup: false });
    }

    onSubmit(event) {
        event.preventDefault();
        const { projectName, description, deadline } = this.state;
        this.setState({ projectName: "", description: "", deadline: "" });

        const token = localStorage.getItem("token");

        axios.post("http://localhost:5000/projects/new",
            { projectName, description, deadline },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                this.getProjects();
                this.handleClose();
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: "Could not create project. Please try again." });
            });
    }

    onChangeProjectName(e) {
        this.setState({ projectName: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onChangeDeadline(e) {
        this.setState({ deadline: e.target.value });
    }

    getProjects() {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/projects", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => {
                this.setState({ projects: res.data });
            })
            .catch((err) => {
                console.log(err);
                
                //this.setState({ error: "Could not get projects. Please try again." });
            
            }
            );
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        const halfWayThough = Math.floor(this.state.projects.length / 2);
        const leftColumn = this.state.projects.slice(0, halfWayThough);
        const rightColumn = this.state.projects.slice(halfWayThough, this.state.projects.length);

        const leftProjects = leftColumn.map((project, key) =>
            <ProjectInfo key={project._id} project={project} getProjects={this.getProjects}></ProjectInfo>
        );

        const rightProjects = rightColumn.map((project, key) =>
            <ProjectInfo key={project._id} project={project} getProjects={this.getProjects}></ProjectInfo>
        );

        const buttonStyle = {
            backgroundColor: 'rgba(162, 200, 236, 0.5)',
            padding: '20px',
            marginTop: '50px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        };

        const pageStyle = {
            backgroundColor: '#E4E4D0',
            minHeight: '100vh',
            padding: '20px',
        };

        // Define the background image URL and opacity
        const backgroundImageStyle = {
            backgroundImage: `url('https://cdn.wallpapersafari.com/85/92/qy6s0g.png')`, // Use the correct path to your image
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            minHeight: '100vh',
            opacity: '0.9', // Adjust the opacity as needed
        };

        return (
            <div style={backgroundImageStyle}>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={this.handleShow.bind(this)} style={buttonStyle}>
                            Create a new Project
                        </Button>
                    </Col>
                    <Col>
                        {leftProjects}
                    </Col>
                    <Col>
                        {rightProjects}
                    </Col>
                    <Col>   
                        <Modal show={this.state.showPopup} onHide={this.handleClose.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a new Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                                <Form onSubmit={this.onSubmit.bind(this)}>
                                    <Form.Group controlId="formProjectName">
                                        <Form.Label>Your project name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter project name" value={this.state.projectName} onChange={this.onChangeProjectName.bind(this)} />
                                    </Form.Group>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter project description" value={this.state.description} onChange={this.onChangeDescription.bind(this)} />
                                    </Form.Group>
                                    <Form.Group controlId="formDeadline">
                                        <Form.Label>Deadline</Form.Label>
                                        <Form.Control type="date" value={this.state.deadline} onChange={this.onChangeDeadline.bind(this)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Create Project
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Projects;
