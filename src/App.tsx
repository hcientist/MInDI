import React from 'react';
import { Piano } from './Piano';
import './App.css';
import { initWebMidi } from './WebMidi';

function App() {
  let outputs = initWebMidi()

  return (
    <Piano outputs={outputs} />
  );
}

export default App;
