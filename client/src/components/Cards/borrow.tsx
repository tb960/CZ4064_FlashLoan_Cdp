import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import img1 from '../../assets/dai.png';
import "./Card.css";


function borrowCard(){
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
                            <Card.Title className="job-title">Borrow</Card.Title>
                            <p className="name-pay">Borrow effortlessly by borrowing crypto using you collaterals!</p>
                        </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="borrow">
                    <div>
                        <Button variant="primary" size="lg">Borrow</Button>
                    </div>
                </Container>
            </Card.Body>
            <Card.Body>
                <hr className="line-break"/>
                <p className="name-pay">Not enough collaterals? Consider using flash loan!</p>
                <Container className="flashLoan">
                    <div>
                        <Button variant="danger" size="lg">Flash Loan</Button>
                    </div>
                </Container>
            </Card.Body>
        </Card>
               
    );
}

export default borrowCard;