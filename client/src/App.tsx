import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import NavBar from './components/Navbar/Navbar';
import Cards from './components/Cards/Card';
import UserCard from './components/UserCard/userCard';

function App() {
  return (
      <div>
        <NavBar />
        <Cards /> 
        <UserCard />
      </div>
  );
}

export default App;