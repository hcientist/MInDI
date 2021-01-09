import React from 'react';
import { Piano } from './Piano';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initWebMidi } from './WebMidi';
import { Col, Container, Row } from 'react-bootstrap'
import { Fader } from './Fader';
import Knob from './components/knob/Knob';


function App() {
  // let outputs = initWebMidi()
  const numKnobs = 4
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        {/* <Piano outputs={outputs} /> */}
      </Row>
      <Row>
        {[...Array(numKnobs)].map((elem, i) => <Col key={i} xs={12/numKnobs}><Knob default={50+i} max={100}></Knob></Col>)}
      </Row>
      <Row>
        {[...Array(4)].map((elem, i) => <Col key={i}><Fader></Fader></Col>)}
      </Row>
    </Container>
  );
}

export default App;
