import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalHeader, ModalBody, Form, FormGroup, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors } from 'react-redux-form';


const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);
const required = val => val && val.length;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '5 stars',
            author: '',
            text: '',
            touched: {
                author: false,
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    //I can't get the alert message to pop up
    handleSubmit(event) {
        console.log(`Rating: ${this.rating.value} Author: ${this.author.value} Comments: ${this.text.value}`);
        alert(`Rating: ${this.rating.value} Author: ${this.author.value} Comments: ${this.text.value}`);
        this.toggleModal();
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Button type="submit" className="mt-3" outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Your Comments</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option>1 star </option> 
                                    <option>2 stars</option>
                                    <option>3 stars</option>
                                    <option>4 stars</option>
                                    <option>5 stars</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Author</Label>
                                <Control.text model=".author" name="author" id="author" placeholder="Author Name" className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />                              
                                {/* I don't know why but the error messages are breaking the modal, someone help...
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />*/}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlfor="text">Comments</Label>
                                <Control.textarea model=".text" name="text" id="" placeholder="Comments Here" rows="6" className="form-control" />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit your comments</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments =>
                    <div key={comments.id}>
                        {comments.text} <br></br>
                        -- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}
                    </div>
                )
                }
                <CommentForm />
            </div>
        );
    }
    else {
        return (
            <div>
                <h4>No Comments</h4>
            </div>
        );
    };
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}


export default CampsiteInfo;