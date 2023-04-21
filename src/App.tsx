import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import  Calendar  from './components/Calendar';

function App() {
  return (
    <div className="App">
    <Container>
<Calendar/>
    </Container>
    </div>
  );
}

export default App;
