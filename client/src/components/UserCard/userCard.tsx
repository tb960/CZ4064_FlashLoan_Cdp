import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './userCard.css';

let card_id = [0];

function userCard() {
    return(
        <Container className="contain-size">
            <p className="h1">User Account</p>
            <Row>
                {card_id.map((data) =>{
                    return(
                        <Col xs={12} md={12} lg={12}>
                            
                            <Card className="card-size">
                                <Card.Body className="upper-body">
                                    <Container className="upper-container">
                                        <Row>
                                            <Col xs={3} md={12} lg={12}>
                                            <div className="company-logo">
                                                
                                            </div>
                                            </Col>
                                            <Col xs={9} md={12} lg={12}>
                                            <div>
                                                <p className="name-pay">Apple</p>
                                                <Card.Title className="job-title">Full Stack Software Engineer #SGUnitedJobs</Card.Title>
                                                <p className="name-pay">4000 - 7000 SGD / Monthly</p>
                                            </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container className="middle">
                                        <Row>
                                            <Col className="time" xs={6} md={6} lg={6}>
                                                <p>18 minutes ago</p>
                                            </Col>
                                            <Col className="title" xs={6} md={6} lg={6}>
                                                <span className="specialisation-container">Backend</span>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                                <Card.Body className="lower-body">
                                    <hr className="line-break"/>
                                    <span className="tech-stack-container">Analytics</span>
                                    <span className="tech-stack-container">CI</span>
                                    <span className="tech-stack-container">JavaScript</span>
                                    <span className="tech-stack-container">Git</span>
                                    <span className="tech-stack-container">JavaScript</span>
                                    <span className="tech-stack-container">JavaScript</span>
                                </Card.Body>
                            </Card>
                        
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default userCard;