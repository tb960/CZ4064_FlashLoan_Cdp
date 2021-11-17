import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import "./Card.css";
import Borrow from './borrow';
import Deposit from './deposit'
import Withdraw from './withdraw'


const card_id = [Deposit, Borrow, Withdraw];

function responsiveCard(){
    return(
        <Container className="contain-size">
            <Row>
                {card_id.map((Data) =>{
                    return(
                        <Col xs={12} md={6} lg={4}>
                            <Data />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default responsiveCard;