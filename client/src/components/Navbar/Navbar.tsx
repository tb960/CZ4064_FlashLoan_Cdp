import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useEthers } from '@usedapp/core';
import './Navbar.css';

function NavBar(){
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const isConnected = account !== undefined
  return(
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="Nav-header-style" href="#">Lotto</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
              {isConnected?
                  <Button size="lg" variant="success" onClick={()=>deactivate()}>Connected</Button> : 
                  <Button size="lg" variant="danger" onClick={()=> activateBrowserWallet()}>Connect</Button>
              }
              {console.log(isConnected)}
              {console.log(account)}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;