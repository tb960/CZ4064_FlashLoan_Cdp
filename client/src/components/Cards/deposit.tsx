import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import img1 from '../../assets/ethereum.png';
import "./Card.css";


function depositCard(){
    return(
       
        <Card className="card-size">
            <Card.Body className="upper-body">
                <Container className="upper-container">
                    <Row>
                        <Col xs={3} md={12} lg={12}>
                        <div className="company-logo">
                            <img src={img1} className="company-img"></img>
                        </div>
                        </Col>
                        <Col xs={9} md={12} lg={12}>
                        <div className="wordingPart">
                            <Card.Title className="job-title">Deposit</Card.Title>
                            <p className="name-pay">Deposit your Ethereum to earn interest and start borrowing!</p>
                        </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="middle">
                    <Row>
                        <Col className="time" xs={6} md={6} lg={6}>
                            <p>We only support Ethereum at the moment</p>
                        </Col>
                        <Col className="title" xs={6} md={6} lg={6}>
                            <span className="specialisation-container">Trusted</span>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            <Card.Body>
                <hr className="line-break"/>
                <Container className="middle">
                    <Row>
                        <Col xs={9} md={9} lg={9}>
                            <Form>
                                <Form.Group className="mb-3" controlId="depositedAmount">
                                    <Form.Control placeholder="Enter ETH e.g. 0.1"></Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col className="title" xs={3} md={3} lg={3}>
                            <div>
                                <Button variant="success" size="lg">Deposit</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
   
    );
}

export default depositCard;